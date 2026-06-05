const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const {auth} = require('../middleware/auth');

router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const {items, shippingAddress} = req.body;
    if (!items || !items.length) return res.status(400).json({error:'Cart empty'});
    let total = 0; const orderItems = [];
    for (const item of items) {
      const p = await Product.findById(item.productId);
      if (!p) return res.status(404).json({error:'Product not found'});
      total += p.price * item.quantity;
      orderItems.push({product:p._id, name:p.name, quantity:item.quantity, price:p.price});
    }
    const pi = await stripe.paymentIntents.create({amount:Math.round(total*100), currency:'usd', metadata:{userId:req.user.id}});
    const o = new Order({user:req.user.id, items:orderItems, total, shippingAddress, paymentIntentId:pi.id});
    await o.save();
    res.json({clientSecret: pi.client_secret, orderId: o._id});
  } catch(e) { res.status(500).json({error:e.message}); }
});

router.get('/my-orders', auth, async (req, res) => {
  try { res.json({orders: await Order.find({user:req.user.id}).populate('items.product').sort({createdAt:-1})}); }
  catch(e) { res.status(500).json({error:e.message}); }
});

module.exports = router;

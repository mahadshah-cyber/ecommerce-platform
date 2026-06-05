const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  items: [{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'}, name:String, quantity:Number, price:Number}],
  total: Number, shippingAddress: mongoose.Schema.Types.Mixed,
  paymentIntentId: String,
  status: {type: String, enum: ['pending','paid','shipped','delivered','cancelled'], default: 'pending'},
  createdAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Order', orderSchema);

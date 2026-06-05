const router = require('express').Router();
const Product = require('../models/Product');
const {adminAuth} = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    let q = {};
    if (req.query.category && req.query.category !== 'All') q.category = req.query.category;
    if (req.query.search) q.name = {$regex: req.query.search, $options: 'i'};
    res.json({products: await Product.find(q).sort({createdAt:-1})});
  } catch(e) { res.status(500).json({error:e.message}); }
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({error:'Not found'});
    res.json({product:p});
  } catch { res.status(500).json({error:'Invalid ID'}); }
});

router.post('/', adminAuth, async (req, res) => {
  try { res.status(201).json({product: await Product.create(req.body)}); }
  catch(e) { res.status(500).json({error:e.message}); }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!p) return res.status(404).json({error:'Not found'});
    res.json({product:p});
  } catch { res.status(500).json({error:'Update failed'}); }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({error:'Not found'});
    res.json({message:'Deleted'});
  } catch { res.status(500).json({error:'Delete failed'}); }
});

module.exports = router;

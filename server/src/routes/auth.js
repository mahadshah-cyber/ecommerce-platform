const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    let u = await User.findOne({email});
    if (u) return res.status(400).json({error:'User exists'});
    u = new User({name, email, password}); await u.save();
    const t = jwt.sign({id:u._id, role:u.role}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.status(201).json({token:t, user:{id:u._id, name:u.name, email:u.email, role:u.role}});
  } catch(e) { res.status(500).json({error:e.message}); }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const u = await User.findOne({email});
    if (!u || !(await u.comparePassword(password))) return res.status(400).json({error:'Invalid credentials'});
    const t = jwt.sign({id:u._id, role:u.role}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token:t, user:{id:u._id, name:u.name, email:u.email, role:u.role}});
  } catch(e) { res.status(500).json({error:e.message}); }
});

router.get('/me', async (req, res) => {
  try {
    const t = req.header('Authorization')?.replace('Bearer ','');
    if (!t) return res.status(401).json({error:'No token'});
    const d = jwt.verify(t, process.env.JWT_SECRET);
    const u = await User.findById(d.id).select('-password');
    if (!u) return res.status(404).json({error:'Not found'});
    res.json(u);
  } catch { res.status(401).json({error:'Invalid token'}); }
});

router.post('/admin', async (req, res) => {
  try {
    const {email, password} = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const t = jwt.sign({id:'admin', role:'admin'}, process.env.JWT_SECRET, {expiresIn:'24h'});
      return res.json({token:t, user:{id:'admin', email, role:'admin'}});
    }
    res.status(401).json({error:'Invalid admin credentials'});
  } catch { res.status(500).json({error:'Server error'}); }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const auth = (req,res,next) => {
  const t = req.header('Authorization')?.replace('Bearer ','');
  if (!t) return res.status(401).json({error:'No token'});
  try { req.user = jwt.verify(t, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({error:'Invalid token'}); }
};
const adminAuth = (req,res,next) => {
  auth(req,res,() => { if(req.user.role !== 'admin') return res.status(403).json({error:'Access denied'}); next(); });
};
module.exports = {auth, adminAuth};

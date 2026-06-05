const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.error('MongoDB error:', e));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({error: 'Server error'}); });

app.listen(process.env.PORT || 5000, () => console.log('Server on port', process.env.PORT || 5000));

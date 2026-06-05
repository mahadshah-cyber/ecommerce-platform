require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {name:'Wireless Headphones',description:'Premium noise-cancelling headphones with 30hr battery',price:199.99,category:'Electronics',stock:50,featured:true,image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'},
  {name:'Smart Watch',description:'Fitness tracker with heart rate monitor and GPS',price:249.99,category:'Electronics',stock:30,featured:true,image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'},
  {name:'Leather Jacket',description:'Genuine leather bomber jacket with quilted lining',price:189.99,category:'Clothing',stock:20,featured:true,image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'},
  {name:'JavaScript: The Good Parts',description:'Deep dive into JavaScript by Douglas Crockford',price:29.99,category:'Books',stock:100,featured:false,image:'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'},
  {name:'Yoga Mat',description:'Eco-friendly non-slip yoga mat 6mm',price:39.99,category:'Sports',stock:75,featured:false,image:'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'},
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded 5 products');
  process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });

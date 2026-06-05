# E-Commerce Platform

Full-stack e-commerce platform with React frontend, Node.js/Express backend, MongoDB database, and Stripe payment integration.

## Tech Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Authentication
- **Payments:** Stripe API

## Quick Start

### Backend
```bash
cd server
npm install
cp .env.example .env  # Edit with your MongoDB URI and Stripe keys
npm run seed           # Populate with 5 sample products
npm start
```

### Frontend
```bash
cd client
npm install
npm start
```

Open http://localhost:3000 to view the app.

## Features
- Product catalog with category filtering
- Shopping cart with quantity controls
- Stripe payment integration
- Admin dashboard for product CRUD
- JWT authentication and authorization

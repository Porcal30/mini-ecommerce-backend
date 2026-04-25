🛍️ Mini E-Commerce Platform
1. 📌 Project Overview

Mini E-Commerce Platform is a full-stack web application that allows users to browse products, manage a shopping cart, and place orders. It also provides an admin panel for managing products, categories, and orders.

👤 Users can:
Register and login
Browse products with search, filter, and pagination
Add items to cart
Update cart and checkout
View order history and order details
🛠 Admin can:
Manage products (CRUD)
Upload product images
Manage categories
View and update order status
2. 🌍 Live Links
Frontend URL:
https://mini-ecommerce-frontend-chi.vercel.app
Backend API URL:
https://mini-ecommerce-backend.onrender.com/api/v1
Swagger Docs:
https://mini-ecommerce-backend.onrender.com/api-docs
3. 🧱 Tech Stack
Frontend
Angular (Standalone Components)
Tailwind CSS
RxJS
Backend
Node.js
Express.js
TypeScript
JWT Authentication
Zod Validation
Swagger (OpenAPI)
Database
Supabase (PostgreSQL)
Supabase Storage (for images)
4. ⚙️ Setup Instructions
📦 Run Frontend
cd client
npm install
ng serve

Open:

http://localhost:4200
🔌 Run Backend
cd server
npm install
npm run dev

Create .env file:

PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:4200
🔗 Connect Frontend to Backend

Update:

src/environments/environment.ts
apiUrl: 'https://mini-ecommerce-backend.onrender.com/api/v1'
5. 🔗 API Overview
🔐 Auth
POST /auth/register
POST /auth/login
GET /auth/me
📦 Products
GET /products
GET /products/:id
POST /products (admin)
PATCH /products/:id (admin)
DELETE /products/:id (admin)
POST /products/:id/image (admin)
📂 Categories
GET /categories
GET /categories/:id
POST /categories (admin)
PATCH /categories/:id (admin)
DELETE /categories/:id (admin)
🛒 Cart
GET /cart
POST /cart/items
PATCH /cart/items/:id
DELETE /cart/items/:id
DELETE /cart/clear
📦 Orders
POST /orders/checkout
GET /orders/my-orders
GET /orders/my-orders/:id
🛠 Admin
GET /orders
PATCH /orders/:id/status
6. 🚀 Features Implemented
👤 User Features
Register & Login (JWT authentication)
View products with search, filter, pagination
Product detail page
Add to cart
Update cart quantity
Remove cart items
Checkout (cart → order)
View order history
View order details
🛒 Cart System
Persistent cart per user
Quantity management
Real-time total calculation
Stock validation
📦 Order System
Checkout system
Order creation from cart
Order history tracking
Order status (pending → delivered)
🛠 Admin Features
Manage products (CRUD)
Upload product images (Supabase Storage)
Manage categories
View all orders
Update order status
🔐 Security & Backend Features
JWT authentication
Role-based access (admin/user)
Input validation (Zod)
Global error handling
Protected routes
CORS configured for frontend
🔎 Advanced Features
Search, filtering, pagination
File upload (product images)
Swagger API documentation
🎨 UI/UX
Responsive design (mobile + desktop)
Tailwind CSS styling
Loading states
Error handling
Role-based navigation
🎯 Status

✅ Frontend: Completed & Deployed (Vercel)
✅ Backend: Completed & Deployed (Render)
✅ Database: Supabase connected
✅ Full API Integration complete

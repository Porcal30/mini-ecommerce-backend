Mini E-Commerce Platform

1. Project Overview
   
   The Mini E-Commerce Platform is a full-stack web application that allows users to browse products, manage a shopping cart, and place orders. It also includes an admin         panel for managing products, categories, and orders.
   
2. Live Links
   
   Frontend URL:
   
   https://mini-ecommerce-frontend-chi.vercel.app
   
   Backend API URL:
   
   https://mini-ecommerce-backend-rkt8.onrender.com/api/v1
   
   API Documentation (Swagger):
   
   https://mini-ecommerce-backend-rkt8.onrender.com/api-docs

3. Tech Stack

   Frontend:

   * Angular (Standalone Components)
   * Tailwind CSS
   * RxJS

   Backend:

   * Node.js
   * Express.js
   * TypeScript
   * JWT Authentication
   * Zod Validation
   * Swagger (OpenAPI)
     
   Database:
   
   * Supabase (PostgreSQL)
   * Supabase Storage (Image Uploads)

4. Setup Instructions:

   Run Frontend:

   cd client

   npm install

   ng serve

   Open in browser:
   http://localhost:4200

   Run Backend:
   
   cd server
   
   npm install
   
   npm run dev

   Create a .env file in the server folder:

   PORT=5000

   SUPABASE_URL=your_supabase_url

   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   JWT_SECRET=your_secret

   JWT_EXPIRES_IN=7d

   CLIENT_URL=http://localhost:4200

   Connect Frontend to Backend

   Update Angular environment file:
   apiUrl: 'https://mini-ecommerce-backend.onrender.com/api/v1'

5. API Overview
   Authentication:
   * POST /auth/register
   * POST /auth/login
   * GET /auth/me

   Products:
   * GET /products
   * GET /products/:id
   * POST /products (admin)
   * PATCH /products/:id (admin)
   * DELETE /products/:id (admin)
   * POST /products/:id/image (admin)
  
   Categories:
   * GET /categories
   * GET /categories/:id
   * POST /categories (admin)
   * PATCH /categories/:id (admin)
   * DELETE /categories/:id (admin)
  
   Cart:
   * GET /cart
   * POST /cart/items
   * PATCH /cart/items/:id
   * DELETE /cart/items/:id
   * DELETE /cart/clear
  
   Orders:
   * POST /orders/checkout
   * GET /orders/my-orders
   * GET /orders/my-orders/:id
  
   Admin:
   * GET /orders
   * PATCH /orders/:id/status

6. Features Implemented

   User Features:
   
   * User registration and login (JWT authentication)
   * Browse products with search, filter, and pagination
   * View product details
   * Add to cart and manage cart items
   * Checkout and place orders
   * View order history and order details
  
   Cart System:

   * Persistent cart per user
   * Quantity management
   * Real-time total calculation
   * Stock validation
  
   Order System:

   * Checkout functionality (cart → order)
   * Order history tracking
   * Order status management
  
   Admin Features:

   * Manage products (CRUD)
   * Upload product images
   * Manage categories
   * View all orders
   * Update order status

   Backend Features:

   * JWT Authentication
   * Role-based access control (Admin/User)
   * Input validation (Zod)
   * Global error handling
   * CORS configuration

   Additional Features:

   * Search, filtering, and pagination
   * File upload using Supabase Storage
   * API documentation using Swagger

   UI/UX:

   * Responsive design (mobile and desktop)
   * Clean UI using Tailwind CSS
   * Loading states and error handling
   * Role-based navigation

   Status:

   * Frontend: Completed and Deployed (Vercel)
   * Backend: Completed and Deployed (Render)
   * Database: Supabase Integrated
   * API Integration: Fully Functional
   
  


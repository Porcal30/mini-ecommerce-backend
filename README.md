# 🛒 Mini E-Commerce Platform

<p align="center">
  <b>A full-stack modern e-commerce system with user and admin functionality</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Angular-red?style=for-the-badge&logo=angular" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-Supabase-3FCF8E?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/API-Swagger-orange?style=for-the-badge&logo=swagger" />
</p>

---

## 🚀 Live Demo

🔗 **Frontend:**  
https://mini-ecommerce-frontend-chi.vercel.app  

🔗 **Backend API:**  
https://mini-ecommerce-backend-rkt8.onrender.com/api/v1  

📄 **API Docs (Swagger):**  
https://mini-ecommerce-backend-rkt8.onrender.com/api-docs  

---

## 📖 Overview

The **Mini E-Commerce Platform** is a full-stack web application that enables users to browse products, manage a shopping cart, and place orders seamlessly.

It also includes a powerful **Admin Dashboard** for managing products, categories, and order workflows.

---

## ✨ Key Features

### 👤 User Experience
- 🔐 Secure authentication (JWT)
- 🔍 Product search, filtering & pagination
- 🛒 Cart management with real-time updates
- 📦 Order placement & tracking
- 📜 Order history view

### 🛠️ Admin Panel
- 📦 Product management (CRUD)
- 🗂️ Category management
- 🖼️ Image uploads (Supabase Storage)
- 📊 Order monitoring
- 🔄 Order status updates

### ⚙️ Backend Capabilities
- Role-based access control (Admin/User)
- Input validation with Zod
- Global error handling
- RESTful API design
- Swagger API documentation

---

## 🛠️ Tech Stack

### Frontend
- Angular (Standalone Components)
- Tailwind CSS
- RxJS

### Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Zod Validation
- Swagger (OpenAPI)

### Database
- Supabase (PostgreSQL)
- Supabase Storage (Image Uploads)

---

## ⚙️ Getting Started

### 🔹 Run Frontend

```bash
cd client
npm install
ng serve
```

Open: http://localhost:4200  

---

### 🔹 Run Backend

```bash
cd server
npm install
npm run dev
```

Create `.env` file:

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:4200
```

---

### 🔹 Connect Frontend to Backend

```ts
apiUrl: 'https://mini-ecommerce-backend.onrender.com/api/v1'
```

---

## 🔗 API Endpoints

### 🔐 Auth
- POST /auth/register  
- POST /auth/login  
- GET /auth/me  

### 📦 Products
- GET /products  
- GET /products/:id  
- POST /products (admin)  
- PATCH /products/:id (admin)  
- DELETE /products/:id (admin)  
- POST /products/:id/image  

### 🗂️ Categories
- GET /categories  
- POST /categories (admin)  
- PATCH /categories/:id (admin)  
- DELETE /categories/:id (admin)  

### 🛒 Cart
- GET /cart  
- POST /cart/items  
- PATCH /cart/items/:id  
- DELETE /cart/items/:id  
- DELETE /cart/clear  

### 📦 Orders
- POST /orders/checkout  
- GET /orders/my-orders  
- GET /orders/my-orders/:id  

### 🛠️ Admin
- GET /orders  
- PATCH /orders/:id/status  

---

## 🎨 UI/UX Highlights

- 📱 Fully responsive design (mobile + desktop)
- ⚡ Fast and dynamic UI updates
- 🎯 Clean and modern interface
- 🔄 Loading & error states
- 🔐 Role-based navigation

---

## 📊 System Status

| Component  | Status |
|-----------|--------|
| Frontend  | ✅ Deployed (Vercel) |
| Backend   | ✅ Deployed (Render) |
| Database  | ✅ Supabase |
| API       | ✅ Fully Functional |

---

## 📌 Future Improvements

- 💳 Payment integration (Stripe)
- ⭐ Product reviews & ratings
- 📧 Email notifications
- 🧠 Recommendation system

---

## 👨‍💻 Author

**Christian Porcal**  
📧 porcalchristian36@gmail.com  

---

## ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!

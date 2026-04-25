import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ProductList } from './features/products/product-list/product-list';
import { ProductDetail } from './features/products/product-detail/product-detail';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { ManageProducts } from './features/admin/manage-products/manage-products';
import { ManageCategories } from './features/admin/manage-categories/manage-categories';
import { ManageOrders } from './features/admin/manage-orders/manage-orders';
import { MyOrders } from './features/orders/my-orders/my-orders';
import { OrderDetail } from './features/orders/order-detail/order-detail';
import { CartPage } from './features/cart/cart-page/cart-page';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'products', component: ProductList, canActivate: [authGuard] },
  { path: 'products/:id', component: ProductDetail, canActivate: [authGuard] },

  { path: 'admin', component: AdminDashboard, canActivate: [adminGuard] },
  { path: 'admin/products', component: ManageProducts, canActivate: [adminGuard] },
  { path: 'admin/categories', component: ManageCategories, canActivate: [adminGuard] },

  { path: 'admin/orders', component: ManageOrders, canActivate: [adminGuard] },

  { path: 'orders', component: MyOrders, canActivate: [authGuard] },
  { path: 'orders/:id', component: OrderDetail, canActivate: [authGuard] },

  { path: 'cart', component: CartPage, canActivate: [authGuard] },

  { path: '**', redirectTo: 'products' }
];
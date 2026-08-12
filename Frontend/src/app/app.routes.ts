import { Routes } from '@angular/router';
import { adminGuard } from './core/admin.guard';
import { authGuard } from './core/auth.guard';
import { AdminDashboardPage } from './pages/admin-dashboard/admin-dashboard.page';
import { AdminOrdersPage } from './pages/admin-orders/admin-orders.page';
import { AdminProductFormPage } from './pages/admin-product-form/admin-product-form.page';
import { AdminProductsPage } from './pages/admin-products/admin-products.page';
import { CartPage } from './pages/cart/cart.page';
import { CheckoutPage } from './pages/checkout/checkout.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { OrderDetailsPage } from './pages/order-details/order-details.page';
import { OrdersPage } from './pages/orders/orders.page';
import { ProductDetailsPage } from './pages/product-details/product-details.page';
import { ProductsPage } from './pages/products/products.page';
import { RegisterPage } from './pages/register/register.page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Mini E-Commerce' },
  { path: 'login', component: LoginPage, title: 'Login | Mini E-Commerce' },
  { path: 'register', component: RegisterPage, title: 'Register | Mini E-Commerce' },
  { path: 'products', component: ProductsPage, title: 'Products | Mini E-Commerce' },
  { path: 'products/:id', component: ProductDetailsPage, title: 'Product | Mini E-Commerce' },
  { path: 'cart', component: CartPage, canActivate: [authGuard], title: 'Cart | Mini E-Commerce' },
  { path: 'checkout', component: CheckoutPage, canActivate: [authGuard], title: 'Checkout | Mini E-Commerce' },
  { path: 'orders', component: OrdersPage, canActivate: [authGuard], title: 'Orders | Mini E-Commerce' },
  { path: 'orders/:id', component: OrderDetailsPage, canActivate: [authGuard], title: 'Order | Mini E-Commerce' },
  { path: 'admin', component: AdminDashboardPage, canActivate: [adminGuard], title: 'Admin | Mini E-Commerce' },
  { path: 'admin/products', component: AdminProductsPage, canActivate: [adminGuard], title: 'Manage Products | Mini E-Commerce' },
  { path: 'admin/products/create', component: AdminProductFormPage, canActivate: [adminGuard], title: 'Create Product | Mini E-Commerce' },
  { path: 'admin/products/edit/:id', component: AdminProductFormPage, canActivate: [adminGuard], title: 'Edit Product | Mini E-Commerce' },
  { path: 'admin/orders', component: AdminOrdersPage, canActivate: [adminGuard], title: 'Manage Orders | Mini E-Commerce' },
  { path: '**', redirectTo: '' },
];

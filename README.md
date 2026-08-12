# NEXORA — Mini E-Commerce

A full-stack mini e-commerce application with an Angular frontend and a Node.js, Express, and MongoDB backend. NEXORA provides a focused shopping flow for browsing products, managing a cart, placing Cash on Delivery orders, and administering the store catalog and order statuses.

## 👥 Team Members

| # | Team Member | GitHub |
| --- | --- | --- |
| 1 | [Mostafa-K-Fakhry](https://github.com/Mostafa-K-Fakhry) | [@Mostafa-K-Fakhry](https://github.com/Mostafa-K-Fakhry) |
| 2 | [AMRDISTA-01](https://github.com/AMRDISTA-01) | [@AMRDISTA-01](https://github.com/AMRDISTA-01) |
| 3 | [MOHAME-D-69](https://github.com/MOHAME-D-69) | [@MOHAME-D-69](https://github.com/MOHAME-D-69) |
| 4 | [Zyad-reda2011](https://github.com/Zyad-reda2011) | [@Zyad-reda2011](https://github.com/Zyad-reda2011) |
| 5 | [TahaAl-Qalyubiy](https://github.com/TahaAl-Qalyubiy) | [@TahaAl-Qalyubiy](https://github.com/TahaAl-Qalyubiy) |
| 6 | [nadahamdi23](https://github.com/nadahamdi23) | [@nadahamdi23](https://github.com/nadahamdi23) |

## 📌 Project Overview

NEXORA is a mini full-stack e-commerce application for browsing and purchasing categorized products. Customers can search the catalog, view product details and stock availability, manage a shopping cart, and complete checkout with delivery information and Cash on Delivery. They can then view their order history and each order's saved delivery, payment, and product information.

The application also includes role-protected administration tools for managing products and updating order statuses.

## ✨ Key Features

### Customer Features

- Registration and login with JWT-based authentication
- Product browsing, title-based search, and product detail pages
- Stock-aware product quantities
- Shopping cart with add, quantity update, and remove actions
- Live cart item-count badge in the navigation bar
- Checkout with required delivery information: full name, phone number, address, and city
- Cash on Delivery as the supported payment method
- Server-created orders that calculate totals from the current cart, validate stock, reduce stock, and clear the cart
- Order history and detailed order views with product, delivery, payment, subtotal, total, and status information
- Responsive Angular interface built with Bootstrap

### Admin Features

- JWT role authorization for protected admin APIs and frontend routes
- Admin dashboard with product, order, and pending-order counts
- Product creation, editing, and deletion
- Product catalog management with price, category, stock, image URL, and description fields
- Store-wide order management
- Order status updates: `Pending`, `Processing`, `Shipped`, `Delivered`, and `Cancelled`
- Access to detailed customer order information

## 🛠️ Tech Stack

### Frontend

| Technology | Usage |
| --- | --- |
| Angular 20 | Standalone application, routing, forms, guards, HTTP client, and signals |
| TypeScript | Frontend application code and models |
| Bootstrap 5 | Responsive layout and UI components |
| RxJS | HTTP observable flows |
| HTML & CSS | Templates and project styling |

### Backend

| Technology | Usage |
| --- | --- |
| Node.js | JavaScript runtime |
| Express 5 | REST API server and route handling |
| MongoDB | Application database |
| Mongoose | MongoDB schemas and data access |
| JSON Web Token | Authentication tokens and role claims |
| bcrypt | Password hashing and comparison |
| dotenv | Loading backend configuration from `config.env` |

### Development Tooling

- npm
- Angular CLI
- Karma and Jasmine configuration for Angular tests
- GitHub repository metadata is configured in the backend package

## 🏗️ Project Architecture

```text
User
  ↓
Angular Frontend
  ↓  HTTP requests to /api
Angular development proxy (localhost:3000)
  ↓
Node.js + Express REST API
  ↓
Mongoose models
  ↓
MongoDB
```

Angular handles pages, client-side navigation, form validation, and UI state. Its services call the REST API, while an HTTP interceptor attaches the stored JWT as a Bearer token. Route guards restrict authenticated and admin-only frontend pages.

On the server, Express routes map requests to controllers. Controllers implement authentication, catalog, cart, checkout, and order-status logic; Mongoose models define the data structures; and middleware verifies JWTs, checks admin roles, and returns error responses. MongoDB persists users, products, carts, and orders.

## 📂 Project Structure

```text
Mini E-Commerce/
├── Backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   └── err.middleware.js
│   ├── models/
│   │   ├── cart.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── cart.route.js
│   │   ├── order.route.js
│   │   └── product.route.js
│   ├── docs/
│   ├── config.env
│   ├── index.js
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                 # API configuration, guards, interceptor, errors
│   │   │   ├── models/               # TypeScript data interfaces
│   │   │   ├── pages/                # One folder per application page
│   │   │   │   ├── admin-dashboard/
│   │   │   │   ├── admin-orders/
│   │   │   │   ├── admin-product-form/
│   │   │   │   ├── admin-products/
│   │   │   │   ├── cart/
│   │   │   │   ├── checkout/
│   │   │   │   ├── home/
│   │   │   │   ├── login/
│   │   │   │   ├── order-details/
│   │   │   │   ├── orders/
│   │   │   │   ├── product-details/
│   │   │   │   ├── products/
│   │   │   │   └── register/
│   │   │   ├── services/             # Auth, cart, order, and product API services
│   │   │   ├── shared/               # Navbar, footer, and product-card components
│   │   │   ├── app.routes.ts
│   │   │   └── app.ts
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── proxy.conf.json
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- A running MongoDB instance or MongoDB connection string

### 1. Configure and start the backend

The backend loads its configuration from `Backend/config.env`. The source code expects these variables:

```env
mongourl=<your-mongodb-connection-string>
secret_key=<your-jwt-signing-secret>
port=3000
```

The frontend development proxy targets `http://localhost:3000`, so use port `3000` when running the application locally.

```bash
cd Backend
npm install
node index.js
```

### 2. Start the frontend

Open a second terminal:

```bash
cd Frontend
npm install
npm run start
```

Open `http://localhost:4200/`. During development, Angular forwards `/api` requests to the backend through `Frontend/proxy.conf.json`.

### Frontend commands

Run these from `Frontend/`:

```bash
npm run start   # Start the Angular development server
npm run build   # Create a production build
npm run watch   # Build continuously with the development configuration
npm test        # Run the configured Angular test command
```

## 🧭 Application Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Home page |
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/products` | Public | Product catalog and search |
| `/products/:id` | Public | Product details |
| `/cart` | Authenticated | Shopping cart |
| `/checkout` | Authenticated | Delivery form and Cash on Delivery checkout |
| `/orders` | Authenticated | Current user's order history |
| `/orders/:id` | Authenticated / owning user or admin | Order details |
| `/admin` | Admin | Admin dashboard |
| `/admin/products` | Admin | Product management |
| `/admin/products/create` | Admin | Create a product |
| `/admin/products/edit/:id` | Admin | Edit a product |
| `/admin/orders` | Admin | Order management and status updates |

## 🔌 REST API Summary

All API routes are served beneath `/api`.

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Register a user and return a JWT |
| `POST` | `/auth/login` | Public | Log in and return a JWT |

### Products

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/products` | Public | Get all products |
| `GET` | `/products/search?title=&category=` | Public | Search products by title and/or category |
| `GET` | `/products/:id` | Public | Get one product |
| `POST` | `/products` | Admin | Create a product |
| `PATCH` | `/products/:id` | Admin | Update a product |
| `DELETE` | `/products/:id` | Admin | Delete a product |

### Cart

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/cart` | Authenticated | Get the current user's populated cart |
| `POST` | `/cart` | Authenticated | Add a product and quantity to the cart |
| `PATCH` | `/cart/:productId` | Authenticated | Update a cart item's quantity |
| `DELETE` | `/cart/:productId` | Authenticated | Remove a product from the cart |
| `DELETE` | `/cart` | Authenticated | Clear the cart |

### Orders

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/orders` | Authenticated | Create an order from the cart with delivery data and Cash on Delivery |
| `GET` | `/orders` | Authenticated | Get the current user's orders; admins receive all orders |
| `GET` | `/orders/:id` | Owner or admin | Get one order |
| `PATCH` | `/orders/:id` | Admin | Update an order status |

### Checkout Payload

The checkout endpoint accepts the delivery information validated by the frontend and backend:

```json
{
  "customerInfo": {
    "fullName": "Customer Name",
    "phone": "01000000000",
    "address": "Street and building details",
    "city": "Cairo"
  },
  "paymentMethod": "Cash on Delivery"
}
```

The server derives the products, prices, quantities, and total from the authenticated user's cart. It validates stock before creating the order, persists the delivery and payment information, decrements product stock, and clears the cart after a successful order.

## 🔐 Authentication and Authorization

- The backend signs JWTs on registration and login.
- Protected API requests require an `Authorization: Bearer <token>` header.
- The Angular HTTP interceptor attaches the saved token to outgoing requests.
- The Angular auth guard protects cart, checkout, and order routes.
- The Angular admin guard and backend admin middleware restrict administration features to users whose role is `admin`.

## 🗃️ Data Models

- **User**: account details, hashed password, role, and references to products, cart, and orders.
- **Product**: title, description, price, image URL, category, stock, and creator.
- **Cart**: a user reference and product/quantity lines.
- **Order**: user reference, product lines with checkout prices, total price, delivery information, Cash on Delivery payment method, status, and creation date.

## 📄 License

The backend package declares the project under the ISC license.

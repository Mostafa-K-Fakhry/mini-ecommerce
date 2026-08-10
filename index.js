const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "config.env" });

const app = express();

mongoose
    .connect(process.env.mongourl)
    .then(() => console.log("Connected DB"))
    .catch((err) => console.log(err));

app.use(express.json());

// Auth Routes
const authRouter = require("./routes/auth.route");
app.use("/api/auth", authRouter);

// Product Routes
const productRoutes = require("./routes/product.route");
app.use("/api/products", productRoutes);

// Order Routes
const orderRoutes = require("./routes/order.route");
app.use("/api/orders", orderRoutes);

// Cart Routes
const cartRouter = require("./routes/cart.route");
app.use("/api/cart", cartRouter);

// Error Middleware
const errMidlleware = require("./middlewares/err.middleware");
app.use(errMidlleware);

app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
});
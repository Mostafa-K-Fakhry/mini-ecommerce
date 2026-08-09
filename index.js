const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cartRouter = require("./routes/cart.route");

const app = express();

app.use(express.json());

app.use("/cart", cartRouter);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("DB connected");

		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log("DB connection error:", err);
	});

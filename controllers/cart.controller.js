const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addToCart = async (req, res, next) => {
	try {
		const { productId, quantity } = req.body;

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		let cart = await Cart.findOne({
			userId: req.user.id,
		});

		if (!cart) {
			cart = await Cart.create({
				userId: req.user.id,
				products: [
					{
						productId,
						quantity,
					},
				],
			});

			return res.status(201).json({
				message: "Product added to cart successfully",
				cart,
			});
		}

		const existingProduct = cart.products.find(
			(item) => item.productId.toString() === productId,
		);

		if (existingProduct) {
			existingProduct.quantity += quantity;
		} else {
			cart.products.push({
				productId,
				quantity,
			});
		}

		await cart.save();

		return res.status(200).json({
			message: "Product added to cart successfully",
			cart,
		});
	} catch (err) {
		next(err);
	}
};

const getCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOne({ userId: req.user.id }).populate(
			"products.productId",
		);
		if (cart) {
			return res.status(200).json({ success: true, cart });
		}
		res.status(404).json({ success: false, message: "Cart not found" });
	} catch (err) {
		next(err);
	}
};

const updateCartQuantity = async (req, res, next) => {
	try {
		const cart = await Cart.findOne({ userId: req.user.id });

		if (!cart) {
			return res
				.status(404)
				.json({ success: false, message: "cart not found" });
		}

		const product = cart.products.find(
			(item) => item.productId.toString() === req.params.productId,
		);
		if (product) {
			product.quantity = Number(req.body.quantity);
			await cart.save();
			return res
				.status(200)
				.json({ success: true, message: "update is seccessfully" });
		}
		res.status(404).json({ success: false, message: "product not found" });
	} catch (err) {
		next(err);
	}
};

const removeFromCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOne({ userId: req.user.id });

		if (!cart) {
			return res
				.status(404)
				.json({ success: false, message: "cart not found" });
		}

		const product = cart.products.find(
			(item) => item.productId.toString() === req.params.productId,
		);
		if (product) {
			cart.products = cart.products.filter(
				(e) => e.productId.toString() !== req.params.productId,
			);
			await cart.save();
			return res.status(200).json({
				success: true,
				message: "Product removed from cart successfully",
			});
		}
		res.status(404).json({ success: false, message: "product not found" });
	} catch (err) {
		next(err);
	}
};

const clearCart = async (req, res, next) => {
	try {
		const cart = await Cart.findOne({ userId: req.user.id });

		if (!cart) {
			return res
				.status(404)
				.json({ success: false, message: "cart not found" });
		}
		cart.products = [];
		await cart.save();

		return res.status(200).json({
			success: true,
			message: "Cart cleared successfully",
		});
	} catch (err) {
		next(err);
	}
};
module.exports = {
	addToCart,
	getCart,
	removeFromCart,
	updateCartQuantity,
	clearCart,
};

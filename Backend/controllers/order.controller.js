const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const checkout = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { customerInfo, paymentMethod } = req.body;

		if (
			!customerInfo ||
			![
				customerInfo.fullName,
				customerInfo.phone,
				customerInfo.address,
				customerInfo.city,
			].every((value) => typeof value === "string" && value.trim())
		) {
			return res.status(400).json({
				msg: "Full name, phone number, address, and city are required",
			});
		}

		if (paymentMethod !== "Cash on Delivery") {
			return res.status(400).json({
				msg: "Cash on Delivery is the only supported payment method",
			});
		}

		const cart = await Cart.findOne({ userId }).populate(
			"products.productId",
		);

		if (!cart || !cart.products || cart.products.length === 0) {
			return res.status(400).json({
				msg: "Cart is empty",
			});
		}

		// Check stock before creating the order
		for (const item of cart.products) {
			if (item.quantity > item.productId.stock) {
				return res.status(400).json({
					msg: `Insufficient stock for product: ${item.productId.title}`,
					availableStock: item.productId.stock,
					requestedQuantity: item.quantity,
				});
			}
		}

		let totalprice = 0;
		const orderproducts = [];

		for (const item of cart.products) {
			const itemtotal = item.productId.price * item.quantity;

			totalprice += itemtotal;

			orderproducts.push({
				productId: item.productId._id,
				quantity: item.quantity,
				price: item.productId.price,
			});
		}

		// Create order
		const neworder = new Order({
			userId,
			products: orderproducts,
			totalPrice: totalprice,
			customerInfo: {
				fullName: customerInfo.fullName.trim(),
				phone: customerInfo.phone.trim(),
				address: customerInfo.address.trim(),
				city: customerInfo.city.trim(),
			},
			paymentMethod,
		});

		await neworder.save();

		// Decrease product stock
		for (const item of cart.products) {
			await Product.findByIdAndUpdate(item.productId._id, {
				$inc: {
					stock: -item.quantity,
				},
			});
		}

		// Clear cart
		cart.products = [];
		await cart.save();

		return res.status(201).json({
			msg: "Order created successfully",
			order: neworder,
		});
	} catch (error) {
		next(error);
	}
};

const getallOrders = async (req, res, next) => {
	try {
		let orders;

		if (req.user.role === "admin") {
			orders = await Order.find();
		} else {
			orders = await Order.find({
				userId: req.user.id,
			});
		}

		return res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};

const getOrderbyId = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id);

		if (!order) {
			return res.status(404).json({
				message: "Order Not Found",
			});
		}

		if (
			order.userId.toString() !== req.user.id &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({
				message: "Forbidden Access",
			});
		}

		return res.status(200).json(order);
	} catch (error) {
		next(error);
	}
};

const updateOrderStatus = async (req, res, next) => {
	const id = req.params.id;
	const { status } = req.body;

	try {
		const order = await Order.findByIdAndUpdate(
			id,
			{ status },
			{
				new: true,
				runValidators: true,
			},
		);

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Order status updated successfully",
			order,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	checkout,
	getallOrders,
	getOrderbyId,
	updateOrderStatus,
};

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User ID is required"],
		},

		products: {
			type: [
				{
					productId: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "Product",
						required: [true, "Product ID is required"],
					},

					quantity: {
						type: Number,
						required: [true, "Quantity is required"],
						min: [1, "Quantity must be at least 1"],
						validate: {
							validator: Number.isInteger,
							message: "Quantity must be an integer",
						},
					},
				},
			],
			validate: {
				validator: function (products) {
					return products.length > 0;
				},
				message: "Cart must contain at least one product",
			},
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Cart", cartSchema);

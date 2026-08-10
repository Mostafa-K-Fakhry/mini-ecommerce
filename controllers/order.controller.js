const Order = require("../models/order.model");

const updateOrderStatus = async (req, res, next) => {
    const id = req.params.id;
    const { status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true , runValidators: true}
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { updateOrderStatus };
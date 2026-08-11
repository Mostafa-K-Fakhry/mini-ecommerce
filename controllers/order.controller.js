const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

 const checkout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({msg: "Cart is empty" });
    }
    let totalprice = 0;
    const orderproducts = [];

cart.products.forEach(item => {
  const itemtotal = item.productId.price * item.quantity;
  totalprice += itemtotal;

  orderproducts.push({
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.productId.price
  });
});
    const neworder = new Order({
      userId,
      products: orderproducts,
      totalPrice: totalprice
    });
    await neworder.save();
    cart.products = [];
    await cart.save();
    return res.status(201).json({ msg: "Order created successfully"},neworder);
  } catch (error) {
    next(error);
  }
};

 const getallOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({userId});
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

 const getOrderbyId = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    if (order.userId.toString() !== req.user.id && req.user.role!=="admin") {
      return res.status(403).json({ message: "Forbidden Access" });
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
  
 
  
module.exports={checkout, getallOrders,getOrderbyId,updateOrderStatus};



 

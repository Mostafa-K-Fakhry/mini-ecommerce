const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const  verifytoken  = require("../middlewares/auth.middleware");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

router.post("/", verifytoken, orderController.checkout);
router.get("/", verifytoken, orderController.getallOrders);
router.get("/:id", verifytoken, orderController.getOrderbyId);
router.patch("/:id",  verifytoken, admin, orderController.updateOrderStatus);

module.exports = router;

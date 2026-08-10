 const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { verifyToken} = require("../middlewares/auth.middleware");

router.post("/", verifyToken, orderController.checkout);
router.get("/", verifyToken, orderController.getallOrders);
router.get("/:id", verifyToken, orderController.getOrderbyId);
 

module.exports = router;

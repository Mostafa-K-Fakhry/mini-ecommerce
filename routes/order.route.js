 const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { verifyToken} = require("../middlewares/auth.middleware");

router.post("/", verifyToken, orderController.checkout);
router.get("/", verifyToken, orderController.getallOrders);
router.get("/:id", verifyToken, orderController.getOrderbyId);
 
const express = require("express");
const router = express.Router();

const {updateOrderStatus} = require("../controllers/order.controller")

const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");


router.patch("/:id", auth, admin, updateOrderStatus);

module.exports = router;

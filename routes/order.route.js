const express = require("express");
const router = express.Router();

const {updateOrderStatus} = require("../controllers/order.controller")

const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");


router.patch("/:id", auth, admin, updateOrderStatus);

module.exports = router;

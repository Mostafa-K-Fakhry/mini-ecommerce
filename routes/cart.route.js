const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart.controller");

router.post("/", cartController.addToCart);

router.get("/", cartController.getCart);

router.patch("/:productId", cartController.updateCartQuantity);

router.delete("/:productId", cartController.removeFromCart);

router.delete("/", cartController.clearCart);

module.exports = router;

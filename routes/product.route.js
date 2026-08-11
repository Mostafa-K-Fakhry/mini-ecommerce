const express = require("express");
const router = express.Router();

const { createProduct,updateProduct,deleteProduct,getAllProducts,getProductByID,searchProducts } = require("../controllers/product.controller");

const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

router.get("/search", searchProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductByID);

router.post("/", auth, admin, createProduct);
router.patch("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;
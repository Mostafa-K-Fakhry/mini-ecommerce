const express = require("express");
const router = express.Router();

const { createProduct,updateProduct,deleteProduct,getAllProducts,getProductByID,searchProductbyTitle,searchProductByCategory } = require("../controllers/product.controller");

const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

router.post("/", auth, admin, createProduct);
router.patch("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

router.get("/get/all",getAllProducts)
router.get("/get/by/id/:id",getProductByID)
router.get("/search/by/title/:title",searchProductbyTitle)
router.get("/search/by/category/:category",searchProductByCategory)

module.exports = router;
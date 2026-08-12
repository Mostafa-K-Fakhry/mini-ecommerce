const Product = require("../models/product.model");

const createProduct = async (req, res, next) => {
    try {
        const {
            title,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        const product = new Product({
            title,
            description,
            price,
            image,
            category,
            stock,
            createdBy: req.user.id
        });

        await product.save();

        await product.populate("createdBy", "name email");

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            {
                title,
                description,
                price,
                image,
                category,
                stock
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("createdBy", "name email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (err) {
        next(err);
    }
};

const deleteProduct=async(req,res,next)=>{
    try{
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({success:false,msg:"product not found"})
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    }catch(err){
        next(err)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            message: "All Products Retrieved Successfully",
            products
        });

    } catch (err) {
        next(err);
    }
};


const getProductByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Retrieved Successfully",
            product
        });

    } catch (err) {
        next(err);
    }
};


const searchProducts = async (req, res, next) => {
    try {
        const { title, category } = req.query;

        const filter = {};

        if (title) {
            filter.title = {
                $regex: title,
                $options: "i"
            };
        }

        if (category) {
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }

        const products = await Product.find(filter);

        res.status(200).json({
            success: true,
            message: "Products found successfully",
            products
        });

    } catch (err) {
        next(err);
    }
};


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductByID,
    searchProducts
};

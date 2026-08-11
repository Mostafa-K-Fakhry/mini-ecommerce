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

const getAllProducts = async(req,res,next) =>
{
    try
    {
        const products = await Product.find()
        res.status(200).json({message: "All Products Retrieved Successfully" , Products: products})
    }
    catch(err)
    {
        next(err)
    }
}

const getProductByID = async(req,res,next) =>
{
    try
    {
        const id = req.params.id
        const product = await Product.findById(id)
        res.status(200).json({message:"Product Retrieved Successfully" , Product: product})
    }
    catch(err)
    {
        next(err)
    }
}

const searchProductbyTitle = async(req,res,next) =>
{
    try
    {
        const title = req.params.title
        const products = Product.find({title: title})
        res.status(200).json({message: "Product(s) Found Successfully.", Products: products})
    }
    catch(err)
    {
        next(err)
    }
}

const searchProductByCategory = async(req,res,next) =>
{
    try
    {
        const category = req.params.category
        const products = await Products.find({category: category})
        res.status(200).json({message:"Product(s) fetched Successfully.", Products: products})
    }
    catch(err)
    {
        next(err)
    }
    
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductByID,
    searchProductbyTitle,
    searchProductByCategory
};
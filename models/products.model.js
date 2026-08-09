const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema(
    {
        title:
        {
            type: String,
            required: [true,"Please, Enter The title of product!"],
            minLength:[3,"Title must be more than 3 characters long."],
            maxLength:[150,"Title of product must not exceed more than 150 characters."],
        },
        description:
        {
            type: String,
            required: [true,"Please, Enter The description of product!"],
            minLength:[20,"Description must be more than 20 characters long."],
            maxLength:[2000,"Description of product must not exceed more than 2000 characters."],
        },
        price:
        {
            type: Number,
            required: [true,"Please, Enter The price of product!"],
        },
        image:
        {
            type: String,
            required: [true,"Please, Enter The link of image!"],
        },
        category:
        {
            type: String,
            required: [true,"Please, Enter The category of product!"],
            minLength:[2,"Category must be more than 2 characters long."],
            maxLength:[50,"Category of product must not exceed more than 50 characters."],
        },
        stock:
        {
            type: Number,
            required: [true,"Please, Enter The stock of product!"],
        },
        createdBy:
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model('Product',ProductSchema)
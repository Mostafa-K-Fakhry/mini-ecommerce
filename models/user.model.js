const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            trim: true,
            minLength: [3, "Name Must Be Atleast 3 Characters"],
            maxLength: [50, "Name Can't Exceed 50 Characters"]
        },
   
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                "Please enter a valid email address"
            ]
        },

        password: {
            type: String,
            required: [true, "Please Enter Your Password"],
            minLength: [8, "Password Must Be Atleast 8 Characters"],
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ]
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],

        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        },

        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);
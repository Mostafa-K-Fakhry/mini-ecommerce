const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        minLength:[3,"Name Must Be Atleast 3 Characters"],
        maxLength:[50,"Name Can't Exeed 50 Characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:[true,"This Email is Already Used"],
        match:[
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
            "Please enter a valid email address"
        ]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Product
    }],
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Cart
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Order
    }]
    
},{timestamps:true})
module.exports=mongoose.model("User",UserSchema)
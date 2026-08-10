const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config({path:"config.env"})
const express = require("express")
const app = express()


mongoose.connect(process.env.mongourl)
.then( ()=>console.log("Connected DB") )
.catch( (err)=>console.log(err) )

app.use(express.json());

const authRouter = require("./routes/auth.route")
app.use('/api/auth',authRouter)
const productRoutes = require("./routes/product.route");
app.use('/api/products', productRoutes);
const orderRoutes = require("./routes/order.route");
app.use('/api/orders', orderRoutes);

const errMidlleware = require("./middlewares/err.middleware")
app.use(errMidlleware)

app.listen(process.env.port,()=>{
    console.log(`Server is running on port ${process.env.port}`)
})
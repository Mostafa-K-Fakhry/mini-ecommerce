const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config({path:"config.env"})
const express = require("express")
const app = express()


mongoose.connect(process.env.mongourl)
.then( ()=>console.log("Connected DB") )
.catch( (err)=>console.log(err) )


const authRouter = require("./routes/auth.route")
app.use('/auth',authRouter)

app.listen(process.env.port,()=>{
    console.log(`Server is running on port ${process.env.port}`)
})
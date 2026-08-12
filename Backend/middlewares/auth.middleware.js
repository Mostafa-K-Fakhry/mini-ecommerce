const jwt = require("jsonwebtoken")
const key = process.env.secret_key
const verifytoken=(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json("token not found please register or login first")
    try{
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token,key)
        req.user = payload
        next()
    }
    catch(err){
        return res.status(403).json({ error: "Invalid or expired token" })
    }
}
module.exports = verifytoken
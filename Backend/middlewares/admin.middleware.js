const admin = (req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }
    else{
        return res.status(403).json({error:"you are not authorized to access this route"})
    }
}
module.exports = admin
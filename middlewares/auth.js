const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) =>{
    try{
        const token = req.header("Authorization")
        if(!token){
            return res.status(400).json({
                message:"Authentication token missing"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        const user = await User.findByPk(decoded.id);
        if(!user){
            console.log("not user")
            return res.status(400).json({
                message:"Invalid token"
            })
        }

        req.user = user;
        next();
    }catch (err){
        return res.status(400).json({
            message:"Authentication failed", 
            error : err.message
        })
    }
}

module.exports = authenticate;
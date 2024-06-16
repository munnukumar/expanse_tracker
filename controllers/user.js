const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(_id, name) {
    return jwt.sign({ _id: _id, name: name }, process.env.JWT_ACCESS_TOKEN);
}

exports.signup = async(req, res) =>{
    try {
        const {name, email, password, mobile_No} = req.body
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);

        await User.create({
            name : name,
            email: email,
            password: hash,
            mobile_No: mobile_No,
        });
        return res.status(200).json({
            message:'user is created successfully'
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                message: 'user not found'
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(404).json({
                message: 'email or password are wrong'
            });
        }
       
        res.status(200).json({ 
            message: 'User login is successful',
            token: generateAccessToken(user._id, user.name, user.isPremiumUser) });
    }

    catch(err){
        res.status(500).json({message:"something went wrong", err:err})
    }
}

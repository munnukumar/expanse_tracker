const User = require("../models/user")
const bcrypt = require("bcrypt");

exports.signup = async(req, res) =>{
    try {
        const {name, email, password, mobile_No} = req.body
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);

        const result = await User.create({
            name : name,
            email: email,
            password: hash,
            mobile_No: mobile_No
        })
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async(req, res) =>{
    try {
        const {email, password} = req.body;

        const findUser = await User.findOne({WHERE: {email:email}});
        if(!findUser){
            return res.status(404).json({Message: 'user not found'});
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);
        if(!comparePassword){
            return res.status(404).json({Message: 'email or password are wrong'});

        }

        res.status(200).json({message:'user login successfully'});
    }

    catch(err){
        res.status(500).json({message:"something went wrong"})
    }
}

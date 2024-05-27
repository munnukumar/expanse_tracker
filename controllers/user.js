const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../utils/database");

function generateAccessToken(id, name) {
    return jwt.sign({ id: id, name: name }, process.env.JWT_ACCESS_TOKEN);
}

exports.signup = async(req, res) =>{
    const t = await sequelize.transaction();
    try {
        const {name, email, password, mobile_No} = req.body
        const saltRound = 10;
        const hash = await bcrypt.hash(password, saltRound);

        await User.create({
            name : name,
            email: email,
            password: hash,
            mobile_No: mobile_No,
            transaction: t
        })
        await t.commit();
        return res.status(200).json({
            message:'user is created successfully'
        });
    }
    catch (error) {
        await t.rollback();
        res.status(500).json(error);
    }
}

exports.login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email:email}});
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
            message:'user login successfully',
            token: generateAccessToken(user.id, user.name, user.ispremiumuser)
        });
    }

    catch(err){
        res.status(500).json({message:"something went wrong", err:err})
    }
}

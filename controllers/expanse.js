const Expense = require("../models/expanse")
const User = require("../models/user");
const sequelize = require("../utils/database");

exports.addExpense = async(req, res, next) =>{
    const amount = req.body.amount;
    const itemName = req.body.itemName;
    const category = req.body.category;
    const id = req.user.id;

    await User.update(
        { totalexpense: sequelize.literal(`totalexpense + ${amount}`) },
        { where: { id: id } }
    );

    await Expense.create({
        amount:amount,
        itemName:itemName,
        category:category,
        userId: id
    })
    .then(result =>{
       return res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.getExpense = async(req, res, next) =>{
    const id = req.user.id;
    const premium = req.user.ispremiumuser;
    await Expense.findAll({where:{userId:id}})
    .then(expense =>{
        return res.status(200).json({
            expense:expense,
            premium:premium
        });
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.deleteExpense = (req, res, next) =>{
    const expenseId = req.params.id;
    const userId = req.user.id;
    Expense.destroy({where:{id:expenseId, userId:userId}})
    .then((result) =>{
        res.json(result);
        console.log("Expense is deleted!!")
    })
    .catch(err =>{
        console.log(err);
    })
}
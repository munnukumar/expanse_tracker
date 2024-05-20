const Expense = require("../models/expanse")

exports.addExpense = async(req, res, next) =>{
    const amount = req.body.amount;
    const itemName = req.body.itemName;
    const category = req.body.category;
    const id = req.user.id;

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
    await Expense.findAll({where:{userId:id}})
    .then(expense =>{
        res.json(expense);
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
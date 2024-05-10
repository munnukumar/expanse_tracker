const Expense = require("../models/expanse")

exports.addExpense = async(req, res, next) =>{
    const amount = req.body.amount;
    const itemName = req.body.itemName;
    const category = req.body.category;

    await Expense.create({
        amount:amount,
        itemName:itemName,
        category:category
    })
    .then(result =>{
        console.log("Added Successfully");
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.getExpense = async(req, res, next) =>{
    await Expense.findAll()
    .then(expense =>{
        res.json(expense);
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.deleteExpense = (req, res, next) =>{
    const expenseId = req.params.id;
    Expense.destroy({where:{id:expenseId}})
    .then((result) =>{
        res.json(result);
        console.log("Expense is deleted!!")
    })
    .catch(err =>{
        console.log(err);
    })
}
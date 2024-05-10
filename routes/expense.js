const express = require("express");
const expenseController = require("../controllers/expanse")

const router = express.Router();

router.post('/add', expenseController.addExpense);
router.get('/getExpense', expenseController.getExpense);
router.delete('/delete/:id', expenseController.deleteExpense);

module.exports = router;
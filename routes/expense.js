const express = require("express");
const expenseController = require("../controllers/expanse")
const authenticate = require("../middlewares/auth")

const router = express.Router();

router.post('/add-expense',authenticate, expenseController.addExpense);
router.get('/getExpensePerPage', authenticate, expenseController.getExpense);
router.delete('/delete-expense/:_id',authenticate, expenseController.deleteExpense);

module.exports = router;
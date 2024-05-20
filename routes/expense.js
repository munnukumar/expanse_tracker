const express = require("express");
const expenseController = require("../controllers/expanse")
const authenticate = require("../middlewares/auth")

const router = express.Router();

router.post('/add',authenticate, expenseController.addExpense);
router.get('/getExpense', authenticate, expenseController.getExpense);
router.delete('/delete/:id',authenticate, expenseController.deleteExpense);

module.exports = router;
const express = require("express");
const purchaseController = require("../controllers/purchase");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.get("/premiummembership", authenticate, purchaseController.premiumMembership);

router.post("/updatetransactionstatus", authenticate, purchaseController.updateTransactionStatus);

router.post("/failedtransactionstatus", authenticate, purchaseController.failedTransactionStatus);

module.exports = router;
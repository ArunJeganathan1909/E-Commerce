const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  makeOrder,
  myOrders,
  totalOrders,
} = require("../controllers/Order.controller");

const router = express.Router();

router.post("/makeOrder", verifyToken, makeOrder);
router.get("/myOrders/:userId", verifyToken, myOrders);
router.get("/totalOrders/:userId", verifyToken, totalOrders);

module.exports = router;

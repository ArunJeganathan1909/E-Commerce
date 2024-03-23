const express = require("express");
const verifyToken = require("../utils/verifyUser");
const { addToCart } = require("../controllers/Cart.controller");

const router = express.Router();

router.post("/add-to-cart", verifyToken, addToCart);

module.exports = router;

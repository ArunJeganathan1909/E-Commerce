const express = require("express");
const verifyToken = require("../utils/verifyUser");
const { createProduct } = require("../controllers/Product.controller");

const router = express.Router();

router.post("/createProduct", verifyToken, createProduct);

module.exports = router;

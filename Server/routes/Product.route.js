const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/Product.controller");

const router = express.Router();

router.post("/createProduct", verifyToken, createProduct);
router.get("/getProducts", getProducts);
router.delete("/deleteProduct/:productId/:userId", verifyToken, deleteProduct);
router.put("/updateProduct/:productId/:userId", verifyToken, updateProduct);

module.exports = router;

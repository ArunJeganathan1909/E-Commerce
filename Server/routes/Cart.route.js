const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  addToCart,
  getCarts,
  removeFromCart,
  updateCart,
} = require("../controllers/Cart.controller");

const router = express.Router();

router.post("/add-to-cart", verifyToken, addToCart);
router.get("/get-carts/:userId", verifyToken, getCarts);
router.delete(
  "/remove-from-cart/:userId/:productId",
  verifyToken,
  removeFromCart
);
router.put("/update-cart/:userId/:productId", verifyToken, updateCart);

module.exports = router;

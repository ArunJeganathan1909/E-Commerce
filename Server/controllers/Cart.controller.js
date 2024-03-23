const Cart = require("../models/Cart");
const Product = require("../models/Product");
const errorHandler = require("../utils/error");

const addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    // Check if the user already has the product in the cart
    const existingCartItem = await Cart.findOne({ userId, productId });
    if (existingCartItem) {
      // If the product already exists in the cart, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    } else {
      // If the product doesn't exist in the cart, create a new cart item
      const newCartItem = new Cart({
        userId,
        productId,
        quantity,
      });
      const savedCartItem = await newCartItem.save();
      return res.status(201).json(savedCartItem);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart };

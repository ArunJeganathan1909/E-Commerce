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

const getCarts = async (req, res, next) => {
  const userId = req.params.userId; // Assuming the userId is passed as a URL parameter

  try {
    // Retrieve cart items for the given user ID
    const cartItems = await Cart.find({ userId }).populate("productId");

    // Respond with the cart items
    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    // Handle any errors that occur during the process
    next(errorHandler(500, "Failed to fetch user's cart items"));
  }
};

const removeFromCart = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId; // Assuming productId is passed as a URL parameter

  try {
    // Find the cart item to remove
    const cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
      return next(errorHandler(404, "Cart item not found"));
    }

    // Remove the cart item
    await cartItem.remove();

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Cart item removed successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    next(errorHandler(500, "Failed to remove cart item"));
  }
};

const updateCart = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId; // Assuming productId is passed as a URL parameter
  const { quantity } = req.body;

  try {
    // Find the cart item to update
    const cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
      return next(errorHandler(404, "Cart item not found"));
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    // Respond with the updated cart item
    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    // Handle any errors that occur during the process
    next(errorHandler(500, "Failed to update cart item"));
  }
};

module.exports = { addToCart, getCarts, removeFromCart, updateCart };

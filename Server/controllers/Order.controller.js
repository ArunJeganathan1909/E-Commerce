const Order = require("../models/Order");
const Product = require("../models/Product");
const errorHandler = require("../utils/error");

const makeOrder = async (req, res, next) => {
  const { userId, products, totalPrice } = req.body;

  try {
    // Create a new order
    const order = new Order({
      userId,
      products,
      totalPrice,
      status: "pending", // Assuming the default status is "pending"
      createdAt: new Date(), // Assuming the current date and time as the creation date
    });

    // Save the order to the database
    await order.save();

    // Respond with the created order
    res.status(201).json({ success: true, order });
  } catch (error) {
    // Handle any errors that occur during the process
    next(errorHandler(500, "Failed to create order"));
  }
};

const myOrders = async (req, res, next) => {
  const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter

  try {
    // Retrieve orders for the given user ID
    const orders = await Order.find({ userId });

    // Respond with the user's orders
    res.status(200).json({ success: true, orders });
  } catch (error) {
    // Handle any errors that occur during the process
    next(errorHandler(500, "Failed to fetch user's orders"));
  }
};

const totalOrders = async (req, res, next) => {
  const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter

  try {
    // Retrieve all orders
    const allOrders = await Order.find();

    // Filter orders by userId of products
    const filteredOrders = allOrders.filter((order) =>
      order.products.some((product) => product.userId === userId)
    );

    // Respond with the filtered orders
    res.status(200).json({ success: true, orders: filteredOrders });
  } catch (error) {
    // Handle any errors that occur during the process
    next(errorHandler(500, "Failed to fetch orders"));
  }
};

module.exports = { makeOrder, myOrders, totalOrders };

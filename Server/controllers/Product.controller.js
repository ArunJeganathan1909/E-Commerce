const errorHandler = require("../utils/error");
const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newProduct = new Product({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct };

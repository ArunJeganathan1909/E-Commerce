const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;

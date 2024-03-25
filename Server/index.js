const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Auth.route");
const userRoutes = require("./routes/User.route");
const productRoutes = require("./routes/Product.route");
const cartRoutes = require("./routes/Cart.route");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5500;

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}!!`);
});

app.use("/server/auth", authRoutes);
app.use("/server/user", userRoutes);
app.use("/server/product", productRoutes);
app.use("/server/cart", cartRoutes);

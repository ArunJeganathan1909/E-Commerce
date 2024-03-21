const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Auth.route")

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
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}!!`);
});

app.use("/server/auth", authRoutes)

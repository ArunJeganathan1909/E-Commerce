const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  signout,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/User.controller");

const router = express.Router();

router.post("/signout", signout);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getUsers", verifyToken, getUsers);

module.exports = router;

const express = require("express");
const verifyToken = require("../utils/verifyUser");
const { signout } = require("../controllers/User.controller");

const router = express.Router();

router.get("/signout", signout);

module.exports = router;

const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { userInfo } = require("../controllers/user");

router.get("/basicdata", authenticate, userInfo);

module.exports = router;

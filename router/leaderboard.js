const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { leaders, rank } = require("../controllers/leaderboard");

router.get("/", leaders);
router.post("/rank", authenticate, rank);

module.exports = router;

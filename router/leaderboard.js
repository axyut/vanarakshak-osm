const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { topTenLeaders, rank } = require("../controllers/leaderboard");

router.get("/", topTenLeaders);
router.get("/rank", authenticate, rank);

module.exports = router;

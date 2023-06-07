const express = require("express");
const router = express.Router();

const { latestEvents, gift, report } = require("../controllers/contribute");
const authenticate = require("../middleware/authenticate");

router.get("/latestEvents", latestEvents);
router.post("/gift", authenticate, gift);
router.post("/report", report);

module.exports = router;

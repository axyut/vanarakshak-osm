const express = require("express");
const router = express.Router();

const {
	latestEvents,
	contribute,
	report,
} = require("../controllers/contribute");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, contribute);
router.get("/latestEvents", latestEvents);
router.post("/report", report);

module.exports = router;

const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { myPlants, plant, garden } = require("../controllers/plant");

router.get("/my", authenticate, myPlants);
router.post("/one", authenticate, plant);
router.post("/many", authenticate, garden);

module.exports = router;

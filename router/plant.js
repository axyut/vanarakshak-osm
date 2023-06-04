const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const { myPlant, onePlant, manyPlant } = require("../controllers/plant");

router.get("/my", authenticate, myPlant);
//router.get("/one", onePlant);
router.post("/one", authenticate, onePlant);
//router.post("/many", authenticate, manyPlant);

module.exports = router;

const express = require("express");
const router = express.Router();

//const authenticate = require("../middleware/authenticate");
const { login, register, deleteAll } = require("../controllers/auth");
const verifyJWT = require("../authentication/verify");

router.post("/register", register);
router.post("/login", login);
router.get("/delete", deleteAll);

// accessed by protected route
router.get("/jwt", verifyJWT);

module.exports = router;

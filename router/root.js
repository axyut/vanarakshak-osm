const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const publicRouter = require("./public");
const plantRouter = require("./plant");
const leaderRouter = require("./leaderboard");
const contributeRouter = require("./contribute");

//
router.use("/api/public", publicRouter);
router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/plant", plantRouter);
router.use("/api/leaderboard", leaderRouter);
router.use("/api/contribute", contributeRouter);

// homePage
router.get("/", (req, res) => {
	res.json({
		msg: "Welcome to backend server",
		routes: {
			server: "/",
			client: "http://127.0.0.1:5000/",
			api: {
				auth: {
					POST_register: "/api/auth/register",
					POST_login: "/api/auth/login",
					GET_delete: "/api/auth/delete",
				},
			},
		},
	});
});
module.exports = router;

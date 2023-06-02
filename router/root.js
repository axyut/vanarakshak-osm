const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);

// APIs
router.get("/", (req, res) => {
	res.json({
		msg: "Welcome",
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

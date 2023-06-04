const express = require("express");
const router = express.Router();

const { public } = require("../controllers/public");

router.get("/public", public);

router.get("/", async (req, res) => {
	res.json({
		msg: "Public APIs",
		routes: {
			server: "/",
			client: "http://127.0.0.1:5000/",
			api: {
				GET_public: "/api/public",
			},
		},
	});
});

module.exports = router;

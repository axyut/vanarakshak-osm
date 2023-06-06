const express = require("express");
const router = express.Router();

const { stats } = require("../controllers/public");

router.get("/stats", stats);

router.get("/", async (req, res) => {
	res.json({
		msg: "Public APIs",
		routes: {
			server: "/",
			client: "http://127.0.0.1:5000/",
			api: {
				GET_statistics: "/api/stats",
			},
		},
	});
});

module.exports = router;

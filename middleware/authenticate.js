const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new Error("Please get token.", 401);
		}
		const token = authHeader.split(" ")[1];

		const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

		const userFound = await User.findOne({
			_id: verifyToken.userId,
			"tokens.token": token,
		});

		if (!userFound) {
			throw new Error("User not found.");
		}

		req.userFound = userFound;

		console.log("Sucessfully Authenticated.");
		next();
	} catch (error) {
		if (error.message == "TokenExpiredError: jwt expired") {
			res.status(500).json({ msg: error.message });
			console.log(error);
		} else {
			res.status(500).json({ msg: "Unauthorized Access." });
			console.log(error);
		}
	}
};

module.exports = authenticate;

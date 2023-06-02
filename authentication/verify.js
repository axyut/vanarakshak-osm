const { NotFoundError, UnauthenticatedError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("Please get token.");
	}
	try {
		const token = authHeader.split(" ")[1];

		const user = jwt.verify(token, process.env.JWT_SECRET);

		const userFound = await User.findOne({
			uuid: user.uuid,
			email: user.email,
			"tokens.token": token,
		}).select("uuid email -_id ");

		if (!userFound) {
			throw new NotFoundError("User not found.");
		}
		console.log("User checked!");
		res.status(Code.ACCEPTED).json({ userFound });
	} catch (error) {
		if (
			error.message ||
			error.name == "jwt expired" ||
			"TokenExpiredError"
		) {
			res.status(Code.GATEWAY_TIMEOUT).json({
				msg: error.name + " :" + error.message,
			});
			console.log(error.name + " :" + error.message);
		} else {
			res.status(Code.BAD_REQUEST).json({ msg: "Unauthorized Access." });
			console.log(error);
		}
	}
};

module.exports = verifyJWT;

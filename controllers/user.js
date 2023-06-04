const { StatusCodes: Code } = require("http-status-codes");

const userInfo = async (req, res) => {
	const { firstName, lastName, email, uuid } = req.userFound;

	res.status(Code.ACCEPTED).json({
		firstName,
		lastName,
		email,
		uuid,
	});
};

module.exports = { userInfo };

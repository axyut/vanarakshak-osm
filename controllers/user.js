const { StatusCodes: Code } = require("http-status-codes");

const userInfo = async (req, res) => {
	const { firstName, lastName, email, _id: userId } = req.userFound;

	res.status(Code.ACCEPTED).json({
		firstName,
		lastName,
		email,
		userId,
	});
};

module.exports = { userInfo };

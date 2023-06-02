const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
	// Default Error

	let customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || err.msg || "Something went wrong try again later",
	};

	if (err.name === "ValidationError") {
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(",");
		customError.statusCode = 400;
	}

	if (err.name === "CastError") {
		customError.msg = `No item found with id : ${err.value}`;
		customError.statusCode = 404;
	}

	return res.status(customError.statusCode).json({ msg: customError.msg });
};
const notFound = (req, res) =>
	res.status(StatusCodes.NOT_FOUND).json({ msg: "Route doesn't Exist!" });

module.exports = { errorHandler, notFound };

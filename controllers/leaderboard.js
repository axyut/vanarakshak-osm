const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const Leaderboard = require("../models/LeaderBoard");
const User = require("../models/User");

// API
const topTenLeaders = async (req, res) => {
	try {
		const topTenRanks = await Leaderboard.find({})
			.select("-_id -createdAt -updatedAt -__v")
			.sort({ rank: 1 })
			.limit(10);
		res.status(Code.ACCEPTED).json({ topTenRanks });
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

// API
const rank = async (req, res) => {
	const { _id: leaderId } = req.userFound;
	try {
		const userRank = await Leaderboard.findOne({ leaderId }).select(
			"-_id -createdAt -updatedAt -__v"
		);
		res.status(Code.ACCEPTED).json({ userRank });
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

module.exports = { rank, topTenLeaders };

const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const Leaderboard = require("../models/LeaderBoard");
const User = require("../models/User");

// API
const leaders = async (req, res) => {
	try {
		const topTenRanks = await Leaderboard.find({})
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
	const { uuid } = req.userFound;
	try {
		const { _id: leaderId } = await User.findOne({ uuid }).select("_id");
		const userRank = await Leaderboard.findOne({ leaderId });
		res.status(Code.ACCEPTED).json({ userRank });
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

// Update Function
const updateLeader = async (usersplantsCount, leaderId) => {
	try {
		// const { rank } = await Leaderboard.find({
		// 	plantsCount: { $lt: usersplantsCount },
		// })
		// 	.sort({ rank: -1 })
		// 	.select("rank")
		// 	.limit(1);

		// rank += 1;
		// const updatedRank = await Leaderboard.findByIdAndUpdate(leaderId, {
		// 	rank,
		// });

		// if (updatedRank) {
		// 	console.log(`this is ${rank}`);

		// 	return rank;
		// }
		return 1;
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

// Post Function executes 1 time when user registers.
const postLeader = async (plantsCount, leaderId, leaderName) => {
	try {
		const leaders = await Leaderboard.find({}).select({ leaderName: 1 });
		const rank = leaders.length;

		let leader = new Leaderboard({
			rank,
			plantsCount,
			leaderId,
			leaderName,
		});
		await leader.save().then(await updateLeader(plantsCount, leaderId));

		console.log(`PlantCount:${plantsCount} updated for ${leaderName}`);
		return rank;
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

module.exports = { rank, leaders, updateLeader, postLeader };

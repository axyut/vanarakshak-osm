const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const Leaderboard = require("../models/LeaderBoard");

// Update Function
const updateLeader = async (addCount, leaderId) => {
	try {
		// as of now, update only the plants counts and stats
		// update rank later on

		const { plantsCount } = await Leaderboard.findOne({ leaderId }).select(
			"-_id -leaderId -createdAt -updatedAt -__v"
		);
		const update = {
			plantsCount: plantsCount + Number(addCount),
		};
		const updated = await Leaderboard.findOneAndUpdate(
			{ leaderId },
			update
		);
		if (updated) {
			const updated = await Leaderboard.findOne({ leaderId }).select(
				"-_id -leaderId -createdAt -updatedAt -__v"
			);
			return updated;
		}

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
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

// Post Function executes 1 time when user registers.
const postLeader = async (leaderId, leaderName) => {
	try {
		const leaders = await Leaderboard.find({}).select({ leaderName: 1 });
		const rank = leaders.length;

		let leader = new Leaderboard({
			rank,
			leaderId,
			leaderName,
		});
		const saved = await leader.save();
		if (saved) {
			console.log(`Statistics created for ${leaderName}`);
			return rank;
		}
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

module.exports = { updateLeader, postLeader };

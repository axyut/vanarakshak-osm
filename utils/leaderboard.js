const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const Leaderboard = require("../models/LeaderBoard");

// Update Function
const updateLeader = async (addCount, leaderId) => {
	try {
		const user = await Leaderboard.findOne({ leaderId }).select(
			"-_id -leaderId -createdAt -updatedAt -__v"
		);
		let { plantsCount, carbon, temperature, oxygen, aqi } = user;

		// carbon dioxide 10-40 kg   AVG : 35kg
		// temp 5 degrees in the immediate vicinity
		// oxygen 135kg per year
		// aqi 10%
		plantsCount += Number(addCount);
		carbon += addCount * 25.32;
		temperature += addCount * 4.8;
		oxygen += addCount * 135;
		aqi += addCount * 10;

		const update = {
			plantsCount,
			carbon,
			temperature,
			oxygen,
			aqi,
		};
		const updated = await Leaderboard.findOneAndUpdate(
			{ leaderId },
			update
		);
		// plantsCount Updated a leader

		const users = await Leaderboard.find()
			.sort({ plantsCount: -1 })
			.select("_id")
			.exec();

		const rankUpdates = users.map(async (currentUser, index) => {
			if (currentUser._id.toString() === leaderId) {
				user.rank = index + 1;
				await user.save();
			} else {
				const otherUser = await Leaderboard.findById(currentUser._id);
				otherUser.rank = index + 1;
				await otherUser.save();
			}
		});

		await Promise.all(rankUpdates);
		// rank updated for a leader

		if (updated) {
			const updated = await Leaderboard.findOne({ leaderId }).select(
				"-_id -leaderId -createdAt -updatedAt -__v"
			);
			console.log(`${updated.leaderName} jumped to rank:${updated.rank}`);
			return updated;
		}
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

// Post Function executes 1 time when user registers.
const postLeader = async (leaderId, leaderName) => {
	try {
		const leaders = await Leaderboard.find({}).select({ leaderName: 1 });
		const rank = leaders.length + 1;

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

const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");

const User = require("../models/User");
const Plant = require("../models/Plant");

const { updateLeader } = require("../utils/leaderboard");

// Middleware authentication data
//const { firstName, lastName, email, _id } = req.userFound;

const myPlant = async (req, res) => {
	const { firstName, _id } = req.userFound;

	try {
		const plants = await Plant.find({
			plantedBy: _id,
		}).select("-_id -__v -updatedAt");

		if (!plants) throw new NotFoundError();

		res.status(Code.ACCEPTED).json({
			count: plants.length,
			plants,
		});
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

const onePlant = async (req, res) => {
	const { plantName, plantType, status, nickName } = req.body;
	const { _id: mongoId, firstName } = req.userFound;

	if (!plantName || !plantType || !status || !nickName) {
		throw new BadRequestError("Fill all the required fields!");
	}

	try {
		const plant = new Plant({
			plantName,
			plantType,
			status,
			nickName,
			plantedBy: mongoId,
		});

		await plant.save();

		// Update Leaderboard statistics
		const newStats = await updateLeader(1, mongoId);

		console.log(`${firstName} Registered Plant ${nickName}`);
		res.status(Code.CREATED).json({
			msg: "Plant successfully Created!",
			newStats,
		});
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

module.exports = { myPlant, onePlant };

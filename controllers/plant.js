const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");

const Plant = require("../models/Plant");
const Garden = require("../models/Garden");

const { updateLeader } = require("../utils/leaderboard");

// Middleware authentication data
//const { firstName, lastName, email, _id } = req.userFound;

const myPlants = async (req, res) => {
	const { firstName, _id } = req.userFound;

	try {
		// User's plants
		const plants = await Plant.find({
			plantedBy: _id,
		}).select("-_id -__v -updatedAt");

		// User's Gardens
		const gardens = await Garden.find({
			plantedBy: _id,
		}).select("-_id -__v -updatedAt");

		if (!plants || !gardens) throw new NotFoundError();

		// All Plants Count (also available in Leaderboard directly)
		let count = 0;
		gardens.forEach((garden) => {
			count += garden.plantsCount;
		});
		count = count + plants.length;

		res.status(Code.ACCEPTED).json({
			plantsCount: count,
			user: firstName,
			plants,
			gardens,
		});
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

const plant = async (req, res) => {
	const { plantName, plantType, status, nickName, location } = req.body;
	const { _id: mongoId, firstName } = req.userFound;

	if (!plantName || !plantType || !status || !nickName || !location) {
		throw new BadRequestError("Fill all the required fields!");
	}

	try {
		const plant = new Plant({
			plantName,
			plantType,
			status,
			nickName,
			location,
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

const garden = async (req, res) => {
	const { plantsCount, gardenName, plantType, status, area } = req.body;
	const { _id: mongoId, firstName } = req.userFound;

	if (!gardenName || !plantType || !status || !plantsCount || !area) {
		throw new BadRequestError("Fill all the required fields!");
	}
	try {
		const garden = new Garden({
			plantsCount,
			gardenName,
			plantType,
			status,
			area,
			plantedBy: mongoId,
		});
		await garden.save();

		const newStats = await updateLeader(plantsCount, mongoId);

		console.log(
			`${firstName} Planted ${plantsCount} in ${gardenName} garden `
		);
		res.status(Code.CREATED).json({
			msg: "Garden planted successfully!",
			newStats,
		});
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};
module.exports = { myPlants, plant, garden };

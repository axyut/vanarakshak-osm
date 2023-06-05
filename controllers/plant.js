const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");

const User = require("../models/User");
const Plant = require("../models/Plant");

const { postLeader } = require("../controllers/leaderboard");

// Middleware authentication data
//const { firstName, lastName, email, uuid } = req.userFound;

const myPlant = async (req, res) => {
	const { firstName, uuid } = req.userFound;

	try {
		const mongoId = await User.findOne({ uuid }).select("_id");

		const plants = await Plant.find({
			plantedBy: mongoId,
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
	const { firstName, uuid } = req.userFound;

	if (!plantName || !plantType || !status || !nickName) {
		throw new BadRequestError("Fill all the required fields!");
	}

	try {
		const { _id: mongoId, firstName } = await User.findOne({ uuid }).select(
			"_id firstName"
		);
		const plant = new Plant({
			plantName,
			plantType,
			status,
			nickName,
			plantedBy: mongoId,
		});

		await plant.save();

		// call update leaderboard function

		console.log(`${firstName} Registered Plant ${nickName}`);
		res.status(Code.CREATED).json({
			msg: "Plant successfully Created!",
		});
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

module.exports = { myPlant, onePlant };

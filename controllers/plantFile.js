const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");

const Plant = require("../models/Plant");
const Garden = require("../models/Garden");

const { updateLeader } = require("../utils/leaderboard");

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

let storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => {
		const uniqueName = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	},
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 2 } }).single(
	"file"
); //2mb

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
	const { plantName, plantType, status, nickName, area } = req.body;
	const { _id: mongoId, firstName } = req.userFound;

	// console.log(plantName, plantType, status, nickName, location);

	if (!plantName || !plantType || !status || !nickName || !area) {
		throw new BadRequestError("Fill all the required fields!");
	}

	try {
		upload(req, res, async (err) => {
			if (err) {
				return res
					.status(Code.EXPECTATION_FAILED)
					.json({ msg: err.message || err.name });
			}
			console.log(req.file.filename);

			const plant = new Plant({
				plantName,
				plantType,
				status,
				nickName,
				area,
				plantedBy: mongoId,
				file: {
					filename: req.file.filename,
					path: req.file.path,
					size: req.file.size,
				},
			});

			await plant.save();

			// Update Leaderboard statistics
			const newStats = await updateLeader(1, mongoId);

			console.log(`${firstName} Registered Plant ${nickName}`);
			res.status(Code.CREATED).json({
				msg: "Plant successfully Created!",
				newStats,
			});
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
		upload(req, res, async (err) => {
			if (err) {
				return res
					.status(Code.EXPECTATION_FAILED)
					.json({ msg: err.message || err.name });
			}
			console.log(req.file.filename);

			const garden = new Garden({
				plantsCount,
				gardenName,
				plantType,
				status,
				area,
				plantedBy: mongoId,
				file: {
					filename: req.file.filename,
					path: req.file.path,
					size: req.file.size,
				},
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
		});
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};
module.exports = { myPlants, plant, garden };

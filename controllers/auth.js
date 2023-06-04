const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes: Code } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { postLeader } = require("./leaderboard");

const register = async (req, res) => {
	const { firstName, lastName, email, phone, password } = req.body;

	if (!firstName || !email || !password) {
		throw new BadRequestError("Fill all the required fields!");
	}

	try {
		if (await User.findOne({ email })) {
			throw new BadRequestError("User already Exists!");
		}
		const user = new User({
			firstName,
			lastName,
			email,
			phone,
			password,
		});

		await user.save();

		// POST to leaderboard
		const { _id: mongoId } = await User.findOne({ email });
		const rank = await postLeader(0, mongoId, firstName);
		if (rank) {
			console.log(`${firstName} Registered at rank:${rank}`);

			res.status(Code.CREATED).json({
				msg: "User Successfully Created!",
				rank,
			});
		}
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			throw new BadRequestError("Fill all the required fields!");
		}
		const userExist = await User.findOne({ email: email });
		if (userExist) {
			const verifiedPassword = await bcrypt.compare(
				password,
				userExist.password
			);
			if (verifiedPassword) {
				const token = await userExist.createToken();
				console.log(`${userExist.firstName} Logged In.`);

				res.status(Code.ACCEPTED).json({
					msg: "Login Successful!",
					token,
				});
			} else {
				throw new NotFoundError("Invalid Credentials");
			}
		} else {
			throw new NotFoundError("Invalid Credentials");
		}
	} catch (error) {
		console.log(error);
		throw new CustomAPIError(error.message || error.name || error.msg);
	}
};

const deleteAll = async (req, res) => {
	await User.deleteMany();
	res.status(Code.GONE).json({ msg: "All Users Deleted Successfully!" });
};

module.exports = { login, register, deleteAll };

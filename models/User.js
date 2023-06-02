const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
	{
		uuid: {
			type: String,
			required: [true, "UUID is required"],
			unique: true,
			tirm: true, // trim unwanted spaces
			minlength: 8,
			maxlength: 40,
			default: uuidv4(),
		},
		firstName: {
			type: String,
			required: [true, "Firstname is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
		},
		lastName: {
			type: String,
			tirm: true,

			maxlength: 20,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			tirm: true,
			minlength: 8,
			maxlength: 32,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please provide valid email",
			],
		},
		phone: {
			type: Number,
			max: 9999999999,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			tirm: true,
		},
		role: {
			type: String,
			required: [true, "Role is required"],
			default: "NORMAL",
			enum: {
				values: ["NORMAL", "POWER", "ADMIN", "OWNER"],
				message: "{VALUE} is not Supported",
			},
		},
		tokens: [{ token: { type: String, required: true } }],
	},
	{ timestamps: true }
);

// MIDDLEWARE
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}

	next();
});

// JWT token
userSchema.methods.createToken = async function () {
	try {
		let sendToken = jwt.sign(
			{
				uuid: this.uuid,
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				role: this.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);
		this.tokens = this.tokens.concat({ token: sendToken });
		await this.save();
		return sendToken;
	} catch (error) {
		console.log(error);
	}
};

const User = mongoose.model("USER", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const AreaSchema = new mongoose.Schema({
	radius: {
		type: Number,
		required: true,
		default: 1,
	},
	place: {
		type: String,
		required: true,
		tirm: true,
		minlength: 3,
	},
	location: {
		type: [Number],
		required: [true, "Location is required!"],
		trim: true,
		unique: true,
	},
	_id: false,
});

const FileSchema = new mongoose.Schema({
	filename: {
		type: String,
		required: [true, "Filename is required"],
		tirm: true,
		minlength: 2,
		maxlength: 100,
	},
	path: { type: String, required: true },
	size: {
		type: Number,
		required: true,
		validate: {
			validator: function (value) {
				return value <= 2 * 1024 * 1024; // 10MB in bytes
			},
			message: "File size limit exceeded (10MB).",
		},
	},
	_id: false,
});

const gardenSchema = new mongoose.Schema(
	{
		plantsCount: {
			type: Number,
			required: [true, "No. of Plants in garden is required"],
			default: 1,
		},
		gardenName: {
			type: String,
			required: [true, "Garden Name is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
		},
		plantType: {
			type: String,
			required: [true, "Plant Type is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
			enum: {
				values: ["Tree", "Flower", "Shurbs", "Herbs"],
				message: "{VALUE} is not Supported",
			},
		},
		plantedBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide Contributer!"],
		},
		belongsTo: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
				required: [true, "Please provide Contributer!"],
				default: function () {
					return this.plantedBy;
				},
			},
		],
		status: {
			type: String,
			required: [true, "Health Status is required"],
			default: "GREAT",
			enum: {
				values: ["POOR", "OKAY", "NORMAL", "GREAT"],
				message: "{VALUE} is not Supported",
			},
		},
		area: { type: AreaSchema, required: true },
		file: { type: FileSchema },
	},
	{ timestamps: true }
);

const Garden = mongoose.model("GARDEN", gardenSchema);

module.exports = Garden;

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
	},
	_id: false,
});

const reportSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			minlength: 3,
			required: [true, "Title is required!"],
			trim: true,
		},
		content: {
			type: String,
			minlength: 10,
			required: [true, "Content is required!"],
			trim: true,
		},
		source: {
			type: String,
			required: [true, "Source is required!"],
		},
		reportedBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide reporter!"],
		},
		disasterLevel: {
			type: Number,
			max: 5,
			enum: {
				values: [1, 2, 3, 4, 5],
				message: "{VALUE} is not Supported",
			},
		},
		disasterType: {
			type: String,
			enum: {
				values: [
					"Deforestation",
					"Forest-fire",
					"Insect-infectations",
					"Disease-epidemics",
				],
				message: "{VALUE} is not Supported",
			},
		},
		area: { type: AreaSchema, required: true },
	},
	{ timestamps: true }
);

const Report = mongoose.model("REPORT", reportSchema);

module.exports = Report;

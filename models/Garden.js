const mongoose = require("mongoose");

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
	},
	{ timestamps: true }
);

const Garden = mongoose.model("GARDEN", gardenSchema);

module.exports = Garden;

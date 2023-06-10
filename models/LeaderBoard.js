const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema(
	{
		rank: {
			type: Number,
			required: [true, "Rank is required!"],
			//unique: true,
		},
		plantsCount: {
			type: Number,
			required: [true, "Plants Count is required"],
			default: 0,
		},
		leaderId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide Leader!"],
			unique: true,
		},
		leaderName: {
			type: String,
			required: [true, "Firstname is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
		},
		// Statistics
		carbon: {
			type: Number,
			required: [true, "Carbon Emission level is required!"],
			default: 0,
		},
		temperature: {
			type: Number,
			required: [true, "Temperature is required!"],
			default: 0,
		},
		oxygen: {
			type: Number,
			required: [true, "Global warming level is required!"],
			default: 0,
		},
		aqi: {
			type: Number,
			required: [true, "Air pollution level is required"],
			default: 0,
		},
	},
	{ timestamps: true }
);

// leaderSchema.pre("save", async function (next) {
// 	if (this.isNew) {
// 		if (!this.rank) {
// 			const count = await this.constructor.countDocuments();
// 			this.rank = count + 1;
// 		}
// 	}
// 	next();
// });

const Leaderboard = mongoose.model("LEADERBOARD", leaderSchema);

module.exports = Leaderboard;

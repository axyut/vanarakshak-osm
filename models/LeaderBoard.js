const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema(
	{
		rank: {
			type: Number,
			required: [true, "Rank is required!"],
			unique: true,
		},
		plantsCount: {
			type: Number,
			required: [true, "Plants Count is required"],
		},

		leaderId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide Leader!"],
		},
		leaderName: {
			type: String,
			required: [true, "Firstname is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
		},
	},
	{ timestamps: true }
);

//MIDDLEWARE
// plantSchema.pre("save", async function (next) {
// 	if (!this.belongsTo) {
// 		this.belongsTo[0] = this.plantedBy;
// 	}

// 	next();
// });

const Leaderboard = mongoose.model("LEADERBOARD", leaderSchema);

module.exports = Leaderboard;

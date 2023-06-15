const mongoose = require("mongoose");

const AreaSchema = new mongoose.Schema({
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

const plantSchema = new mongoose.Schema(
	{
		plantName: {
			type: String,
			required: [true, "Plant Name is required"],
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
					if (this.plantedBy) {
						return this.plantedBy;
					} else {
						return this.plantedBy;
					}
				},
			},
		],
		status: {
			type: String,
			required: [true, "Health Status is required"],
			default: "OKAY",
			enum: {
				values: ["POOR", "OKAY", "NORMAL", "GREAT"],
				message: "{VALUE} is not Supported",
			},
		},
		nickName: {
			type: String,
			required: [true, "Nick Name is required"],
			tirm: true,
			minlength: 2,
			maxlength: 20,
		},
		area: { type: AreaSchema, required: true },
		file: { type: FileSchema },
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

const Plant = mongoose.model("PLANT", plantSchema);

module.exports = Plant;

// location: [37.7749, -122.4194]
// const yourDocument = await YourModel.findOne({
// 	/* your query */
// });
// const latitude = yourDocument.location[0];
// const longitude = yourDocument.location[1];

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
	},
	_id: false,
});

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Plant Type is required"],
			tirm: true,
			minlength: 3,
		},
		organizer: {
			type: String,
			required: [true, "Plant Type is required"],
			tirm: true,
			minlength: 3,
		},
		content: {
			type: String,
			minlength: 10,
			required: [true, "Content is required!"],
			trim: true,
		},
		area: { type: AreaSchema, required: true },
	},
	{ timestamps: true }
);

const Event = mongoose.model("EVENT", eventSchema);

module.exports = Event;

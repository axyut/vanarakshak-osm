const report = async (req, res) => {
	res.status(200).json({ message: "Reported." });
};

const latestEvents = async (req, res) => {
	res.status(200).json({
		message:
			"latest news events regarding upcoming campaigns, or recent accidents like forest-fire, climate change, deforestation.",
	});
};

const gift = async (req, res) => {
	res.status(200).json({ message: "Gifted to your friend." });
};

module.exports = { latestEvents, report, gift };

const stats = async (req, res) => {
	res.status(200).json({
		message: "Website's acomplishments",
	});
};
module.exports = { stats };

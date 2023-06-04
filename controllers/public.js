const public = async (req, res) => {
	res.status(200).json({ message: "Public api here." });
};

module.exports = { public };

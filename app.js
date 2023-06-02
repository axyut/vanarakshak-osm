require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Local Modules
const rootRouter = require("./router/root");
const connectDB = require("./db/connection");
const { errorHandler, notFound } = require("./middleware/error-handler");

// Security Packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Security
app.set("trust proxy", 1); // enable if your behind a reverse proxy (heroku, bluemix, aws elb, nginx)
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 1 minutes
		max: 100, // limit each ip to 100 requests per windowMs
	})
);
app.use(helmet());
app.use(cors());
app.use(xss());

// Parse JSON Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("", rootRouter);

// Error Middleware
app.use(errorHandler);
app.use(notFound);

// Server
const start = () => {
	const PORT = process.env.PORT || 3000;
	const DB_URL = process.env.CONNECT_DB;
	try {
		connectDB(DB_URL).then(() => {
			app.listen(PORT, () => {
				console.log(`Server is running at http://localhost:${PORT}`);
			});
		});
	} catch (error) {
		console.log(error);
	}
};

start();

import { config } from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import mongoose, { connect } from "mongoose";

import router from "./routes";
import { CustomError, handleError } from "./utils/error-handler";
import { DB_URL } from "./utils/constants";

config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(compression());

mongoose.set("strictQuery", false);
connect(DB_URL, err => {
	if (err) {
		console.error("Could not connect to database:", err);
		process.exit(-1);
	}

	console.log("Connected to database");
});

app.use(router);

// not found route
app.use("*", () => {
	throw new CustomError(404, "Route not found");
});

// error handler
app.use(handleError);

app.listen(process.env.PORT || 5000, () => console.log("Server started"));

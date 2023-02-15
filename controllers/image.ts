import { Request, Response, NextFunction } from "express";
import axios from "axios";

const API_KEY = "Fdxjut2PLSyaw5XTCeDQNYkUx7jJDR4YvSU27rJF"; // should be in a .env file but it does not matter here
const API_LINK = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

export async function getImage(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const apiRes = await axios.get(API_LINK);
		res.status(apiRes.status).json(apiRes.data);
	} catch (err) {
		next(err);
	}
}

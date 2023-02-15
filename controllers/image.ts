import { Request, Response, NextFunction } from "express";
import axios from "axios";

import { NASA_API_LINK } from "../utils/constants";

export async function getImage(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const apiRes = await axios.get(NASA_API_LINK);
		res.status(apiRes.status).json(apiRes.data);
	} catch (err) {
		next(err);
	}
}

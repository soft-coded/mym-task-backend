import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../utils/constants";
import { CustomError } from "../utils/error-handler";

export function protect(req: Request, res: Response, next: NextFunction) {
	try {
		if (!req.headers.authorization) throw new CustomError(401, "Unauthorized");

		// Authorization = "Bearer userToken"
		const token = req.headers.authorization.split(" ")[1];
		const userData = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;

		if (!userData || !userData.email)
			throw new CustomError(401, "Invalid authorization token");

		next();
	} catch (err) {
		next(err);
	}
}

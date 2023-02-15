import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY, UserType } from "../utils/constants";
import { CustomError } from "../utils/error-handler";
import UserModel from "../models/user";

export async function signup(req: Request, res: Response, next: NextFunction) {
	try {
		const reqBody: UserType = req.body;

		const doesUserExist = await UserModel.exists({ email: reqBody.email });
		if (doesUserExist) throw new CustomError(400, "Email already registered");

		const user = new UserModel({
			email: reqBody.email,
			password: reqBody.password, // should be hashed under normal circumstances
			name: reqBody.name
		});
		user.save();

		const token = jwt.sign({ email: reqBody.email }, JWT_SECRET_KEY);
		res.json({ token });
	} catch (err) {
		next(err);
	}
}

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const reqBody: UserType = req.body;

		const user = await UserModel.findOne({ email: reqBody.email });
		if (!user) throw new CustomError(400, "User does not exist");

		// since password is not hashed, direct comparison is valid
		if (user.password !== reqBody.password)
			throw new CustomError(400, "Invalid password");

		const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY);
		res.json({ token });
	} catch (err) {
		next(err);
	}
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import qs from "qs";

import {
	JWT_SECRET_KEY,
	UserType,
	GOOGLE_OAUTH_CREDENTIALS,
	CLIENT_ORIGIN
} from "../utils/constants";
import { CustomError } from "../utils/error-handler";
import UserModel from "../models/user";

function validate(
	field: "Email" | "Password" | "Name",
	value: string,
	minLength: number
) {
	if (value.trim().length < minLength)
		throw new CustomError(
			400,
			`${field} must be at least ${minLength} characters long`
		);
}

export async function signup(req: Request, res: Response, next: NextFunction) {
	try {
		const reqBody: UserType = req.body;
		validate("Email", reqBody.email, 4);
		validate("Password", reqBody.password, 4);
		validate("Name", reqBody.name!, 4);

		const doesUserExist = await UserModel.exists({ email: reqBody.email });
		if (doesUserExist) throw new CustomError(400, "Email already registered");

		const user = new UserModel({
			email: reqBody.email,
			password: reqBody.password, // should be hashed, skipping to save time
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
		validate("Email", reqBody.email, 4);
		validate("Password", reqBody.password, 4);

		const user = await UserModel.findOne({ email: reqBody.email });
		if (!user) throw new CustomError(400, "User does not exist");

		// if the user has logged in using oauth, tell the user to do the same again
		if (user.isOAuthUser) throw new CustomError(400, "Use OAuth to log in");

		// since password is not hashed, direct comparison is valid
		if (user.password !== reqBody.password)
			throw new CustomError(400, "Invalid password");

		const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY);
		res.json({ token });
	} catch (err) {
		next(err);
	}
}

type GoogleUserType = {
	email: string;
	email_verified: boolean;
	name: string;
	picture: string; // pfp link,
	given_name: string;
	locale: string;
	iat: number;
	exp: number;
};

export async function googleOAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	/* This function should be split into multiple sub-functions. Skipping due to time constraints. */
	try {
		const code = req.query.code as string;
		const oauthURL = "https://oauth2.googleapis.com/token";
		const options = {
			code,
			client_id: GOOGLE_OAUTH_CREDENTIALS.client_id,
			client_secret: GOOGLE_OAUTH_CREDENTIALS.client_secret,
			redirect_uri: GOOGLE_OAUTH_CREDENTIALS.full_redirect_uri,
			grant_type: "authorization_code"
		};

		const axiosRes = await axios.post(oauthURL, qs.stringify(options), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});

		// const { id_token, access_token } = axiosRes.data;
		const { id_token } = axiosRes.data;
		const googleUser = jwt.decode(id_token) as GoogleUserType;

		const user = await UserModel.findOne({ email: googleUser.email });
		if (!user) {
			const user = new UserModel({
				email: googleUser.email,
				password: "",
				name: googleUser.name,
				isOAuthUser: true
			});

			await user.save();
		}

		const token = jwt.sign({ email: googleUser.email }, JWT_SECRET_KEY);
		res.redirect(
			`${CLIENT_ORIGIN}/oauth?token=${token}&email=${googleUser.email}`
		);
	} catch (err) {
		next(err);
	}
}

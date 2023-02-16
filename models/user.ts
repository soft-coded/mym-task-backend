import { Schema, model } from "mongoose";

const userSchema = new Schema({
	email: String,
	password: String,
	name: String,
	isOAuthUser: {
		type: Boolean,
		default: false
	}
});

export default model("User", userSchema);

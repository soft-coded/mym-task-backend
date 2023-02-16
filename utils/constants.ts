/**
 * In other circumstances, this would be a .env file with all the required environment variable. But since it does not matter for this app, I am just using a normal typescript file for all the required variables.
 */

export const NASA_API_KEY = "Fdxjut2PLSyaw5XTCeDQNYkUx7jJDR4YvSU27rJF";
export const NASA_API_LINK = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export const JWT_SECRET_KEY = "this_is_the_jwt_secret";

export const DB_URL = "mongodb://localhost:27017/mym-task-db";

// types are also defined in this file to save time
export type UserType = {
	email: string;
	password: string;
	name?: string;
};

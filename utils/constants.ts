/**
 * In other circumstances, this would be a .env file with all the required environment variables. But since it does not matter for this app, I am just using a normal typescript file for all the same purpose.
 */

export const NASA_API_KEY = "Fdxjut2PLSyaw5XTCeDQNYkUx7jJDR4YvSU27rJF";
export const NASA_API_LINK = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export const JWT_SECRET_KEY = "this_is_the_jwt_secret";

// export const DB_URL = "mongodb://localhost:27017/mym-task-db";
export const DB_URL =
	"mongodb+srv://mym-task-admin:mym-task-password@mym-task.6y2ifxm.mongodb.net/?retryWrites=true&w=majority";

// export const CLIENT_ORIGIN = "http://localhost:3000";
// export const SERVER_ORIGIN = "http://localhost:5000";
export const CLIENT_ORIGIN = "https://mym-task-frontend.vercel.app/login";
export const SERVER_ORIGIN = "https://mym-task-backend.onrender.com";

export const GOOGLE_OAUTH_CREDENTIALS = {
	client_id:
		"771787417767-sa2spmpoblvcl6ob10ejijn4ogofnrmu.apps.googleusercontent.com",
	project_id: "mym-task",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_secret: "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",
	redirect_uri: "/oauth/google",
	get full_redirect_uri() {
		return `${SERVER_ORIGIN}${this.redirect_uri}`;
	}
};

// types are also defined in this file to save time
export type UserType = {
	email: string;
	password: string;
	name?: string;
};

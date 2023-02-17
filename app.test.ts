import mongoose from "mongoose";
import request from "supertest";

import { DB_URL } from "./utils/constants";
import app from ".";

beforeEach(async () => {
	await mongoose.connect(DB_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
	await mongoose.connection.close();
});

describe("GET /get-image", () => {
	it("should return today's image", async () => {
		const res = await request(app).get("/get-image");

		expect(res.statusCode).toBe(200);
		expect(res.body.url).toBeTruthy();
		expect(res.body.title).toBeTruthy();
		expect(res.body.explanation).toBeTruthy();
	});
});

describe("POST /login", () => {
	it("should return token", async () => {
		const res = await request(app).post("/login").send({
			email: "test@test.com",
			password: "abcd"
		});

		expect(res.statusCode).toBe(200);
		expect(res.body.token).toBeTruthy();
	});
});

describe("POST /signup", () => {
	it("should return token", async () => {
		const res = await request(app).post("/signup").send({
			email: "a@c.com",
			password: "abcd",
			name: "abcd"
		});

		expect(res.statusCode).toBe(200);
		expect(res.body.token).toBeTruthy();
	});
});

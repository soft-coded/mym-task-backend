import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
	res.send("Server running");
});

export default router;

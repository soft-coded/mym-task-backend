import { Router } from "express";

import imageRouter from "./image";

const router = Router();

router.get("/", (_, res) => {
	res.send("Server running");
});

router.use(imageRouter);

export default router;

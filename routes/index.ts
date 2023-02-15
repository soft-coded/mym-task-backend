import { Router } from "express";

import imageRouter from "./image";
import authRouter from "./auth";

const router = Router();

router.get("/", (_, res) => {
	res.send("Server running");
});

router.use(imageRouter);
router.use(authRouter);

export default router;

import { Router } from "express";

import { getImage } from "../controllers/image";
import { protect } from "../middlewares/protect";

const router = Router();

router.route("/get-image").get(protect, getImage);

export default router;

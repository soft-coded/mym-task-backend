import { Router } from "express";

import { getImage } from "../controllers/image";

const router = Router();

router.route("/get-image").get(getImage);

export default router;

import { Router } from "express";

import { login, signup, googleOAuth } from "../controllers/auth";
import { GOOGLE_OAUTH_CREDENTIALS } from "../utils/constants";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route(GOOGLE_OAUTH_CREDENTIALS.redirect_uri).get(googleOAuth);

export default router;

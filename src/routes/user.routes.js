import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router= Router();

router.route("/register").post(registerUser)
// router.route("/register").post(funt)

export default router;
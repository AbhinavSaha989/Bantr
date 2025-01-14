import express from "express";
import { loginUser, signupUser, logoutUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/logout", logoutUser);
export default router;
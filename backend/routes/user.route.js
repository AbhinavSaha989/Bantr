import express from "express";
import { loginUser, signupUser, logoutUser,getUser } from "../controllers/user.controller.js";
import {checkLoggedIn} from "../middlewares/checkLoggedIn.middleware.js";
const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/logout", logoutUser);

router.get("/get-user", checkLoggedIn, getUser)
export default router;
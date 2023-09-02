import express from "express";
import { loginUser, signUpUser } from "../controllers/userController.js";
import { vaidate_jwt_token } from "../middlewares/validateJWT.js";

export const router = express.Router();

router.post("/login", async (req, res) => await loginUser(req, res));
router.post("/sign-up", async (req, res) => await signUpUser(req, res));

router.get("/validateToken", vaidate_jwt_token);

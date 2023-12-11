import express from "express";
import { loginUser, signUpUser } from "../controllers/user.controller.js";

export const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/sign-up", signUpUser);

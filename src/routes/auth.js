import express from "express"
import { Login, Logout, Register } from "../controllers/auth.js";

const authRoutes=express.Router();

authRoutes.post("/register",Register)
authRoutes.post("/login",Login);
authRoutes.post("/logout",Logout);

export default authRoutes;
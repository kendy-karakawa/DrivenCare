import { Router } from "express";
import userControllers from "../controllers/userControllers.js";

const userRoutes = Router()

userRoutes.post("/signup", userControllers.signup)

export default userRoutes
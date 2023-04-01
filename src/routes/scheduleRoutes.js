import { Router } from "express";
import scheduleControllers from "../controllers/scheduleControllers.js";
import authValidation from "../middlewares/authMiddleware.js";

const scheduleRoutes = Router()

scheduleRoutes.post("/reserve", authValidation, scheduleControllers.createReserve)

export default scheduleRoutes
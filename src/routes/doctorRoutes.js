import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";
import authValidation from "../middlewares/authMiddleware.js";

const doctorRoutes = Router()

doctorRoutes.get("/search", authValidation, doctorControllers.searchDoctor)
doctorRoutes.get("/time/:id", authValidation, doctorControllers.searchUnavaliableTime)

export default doctorRoutes
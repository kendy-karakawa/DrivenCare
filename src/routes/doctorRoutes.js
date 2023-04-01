import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";
import authValidation from "../middlewares/authMiddleware.js";

const doctorRoutes = Router()

doctorRoutes.get("/serch", authValidation, doctorControllers.serchDoctor)


export default doctorRoutes
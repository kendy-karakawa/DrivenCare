import { Router } from "express";
import scheduleControllers from "../controllers/scheduleControllers.js";
import authValidation from "../middlewares/authMiddleware.js";

const scheduleRoutes = Router()

scheduleRoutes.post("/reserve", authValidation, scheduleControllers.createReserve)
scheduleRoutes.put("/confirm/:id", authValidation, scheduleControllers.confirmReserve)
scheduleRoutes.put("/cancel/:id", authValidation, scheduleControllers.cancelReserve)
scheduleRoutes.get("/patient/:id", authValidation, scheduleControllers.findSchedulesByPatientId)
scheduleRoutes.get("/doctor/:id", authValidation, scheduleControllers.findSchedulesByDoctorId)
scheduleRoutes.get("/finished/patient/:id", authValidation, scheduleControllers.findFinishedSchedulesByPatientId)
scheduleRoutes.get("/finished/doctor/:id", authValidation, scheduleControllers.findFinishedSchedulesByDoctorId)




export default scheduleRoutes
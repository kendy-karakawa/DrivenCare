import { Router } from "express";
import doctorRoutes from "./doctorRoutes.js";
import scheduleRoutes from "./scheduleRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/doctor", doctorRoutes)
routes.use("/schedule", scheduleRoutes)


export default routes;
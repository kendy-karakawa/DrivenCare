import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import  validateSchema  from "../middlewares/schemaValidationMiddleware.js";
import { userSchemas } from "../schemas/userSchemas.js";

const userRoutes = Router()

userRoutes.post("/signup",validateSchema(userSchemas), userControllers.signup)
userRoutes.post("/signin", userControllers.signin)

export default userRoutes
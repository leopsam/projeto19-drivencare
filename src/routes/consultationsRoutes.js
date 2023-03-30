import { Router } from "express";
import consultationControllers from "../controllers/consultationControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
//import {signinSchemma, signupSchemma} from "../schemas/userSchema.js";

const consultationRoutes = Router();

consultationRoutes.post('/post', consultationControllers.createrConsultation)

export default consultationRoutes;
import { Router } from "express";
import consultationControllers from "../controllers/consultationControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import { consultationSchemma } from "../schemas/consultationSchema.js";

const consultationRoutes = Router();

consultationRoutes.post('/post', authMiddleware.authValidation, validateSchema(consultationSchemma), consultationControllers.createrConsultation)

export default consultationRoutes;
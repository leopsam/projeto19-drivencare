import { Router } from "express";
import consultationControllers from "../controllers/consultationControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import { consultationSchemma } from "../schemas/consultationSchema.js";

const consultationRoutes = Router();

consultationRoutes.post('/', authMiddleware.authValidation, validateSchema(consultationSchemma), consultationControllers.createrConsultation)
consultationRoutes.get('/', authMiddleware.authValidation, consultationControllers.getConsultationByTypeUser)
consultationRoutes.put('/:id', authMiddleware.authValidation, consultationControllers.putConsultationById)
consultationRoutes.get('/finished', authMiddleware.authValidation, consultationControllers.getConsultationByFinished)

export default consultationRoutes;
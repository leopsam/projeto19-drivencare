import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import {signinSchemma, signupSchemma} from "../schemas/userSchema.js";

const userRoutes = Router();

userRoutes.post('/signup', validateSchema(signupSchemma), userControllers.signup)
userRoutes.post('/signin', validateSchema(signinSchemma), userControllers.signin)
userRoutes.post('/type/:id', userControllers.typeUser)
userRoutes.get('/doctor/search', userControllers.searchDotor)

export default userRoutes;
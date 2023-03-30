import { Router } from "express";
import consultationRoutes from "./consultationsRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/consultations", consultationRoutes);

export default routes;
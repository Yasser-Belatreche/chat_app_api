import { Router } from "express";

const authRoutes: Router = Router();

authRoutes.post("/register", makeExpressController());

export { authRoutes };

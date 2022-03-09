import { Router } from "express";

import { makeExpressController } from "../ExpressControllerFactory";

import { register } from "../../controllers/Auth/register";
import { login } from "../../controllers/Auth/login";
import { confirmUser } from "../../controllers/Auth/confirmUser";

const authRoutes: Router = Router();

authRoutes.post("/register", makeExpressController(register));
authRoutes.post("/login", makeExpressController(login));
authRoutes.put("/confirmUser", makeExpressController(confirmUser));

export { authRoutes };

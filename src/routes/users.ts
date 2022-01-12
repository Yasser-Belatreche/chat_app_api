import { Router } from "express";

// controllers
import { login } from "../controllers/users/login/login";

const usersRouter: Router = Router();

usersRouter.post("/login", login);

export { usersRouter };

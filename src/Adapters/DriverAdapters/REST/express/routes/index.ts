import { Router } from "express";

import { authRoutes } from "./AuthRoutes";
import { usersRoutes } from "./UsersRoutes";

const allRoutes: Router = Router();

allRoutes.use("/auth", authRoutes);
allRoutes.use("/users", usersRoutes);

export { allRoutes };

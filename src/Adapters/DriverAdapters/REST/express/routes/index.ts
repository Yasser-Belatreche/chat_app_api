import { Router } from "express";

import { authRoutes } from "./AuthRoutes";
import { messagesRoutes } from "./MessagesRoutes";
import { usersRoutes } from "./UsersRoutes";

const allRoutes: Router = Router();

allRoutes.use("/auth", authRoutes);
allRoutes.use("/users", usersRoutes);
allRoutes.use("/messages", messagesRoutes);

export { allRoutes };

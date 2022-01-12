import { Router } from "express";

// routes
import { usersRouter } from "./users";

const router: Router = Router();

router.use("/users", usersRouter);

export { router };

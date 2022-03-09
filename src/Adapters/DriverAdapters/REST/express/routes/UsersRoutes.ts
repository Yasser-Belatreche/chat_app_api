import { Router } from "express";

import { makeExpressController } from "../ExpressControllerFactory";

import { getContactsList } from "../../controllers/Users/getContactsList";

const usersRoutes: Router = Router();

usersRoutes.get("/contacts", makeExpressController(getContactsList));

export { usersRoutes };

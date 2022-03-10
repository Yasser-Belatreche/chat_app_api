import { Router } from "express";

import { makeExpressController } from "../ExpressControllerFactory";

import { getContactsList } from "../../controllers/Users/getContactsList";
import { searchForUsers } from "../../controllers/Users/searchForUsers";

const usersRoutes: Router = Router();

usersRoutes.get("/contacts", makeExpressController(getContactsList));
usersRoutes.get("/search", makeExpressController(searchForUsers));

export { usersRoutes };

import { Router } from "express";

import { makeExpressController } from "../ExpressControllerFactory";

import { sendMessage } from "../../controllers/Messages/sendMessage";
import { getMessages } from "../../controllers/Messages/getMessages";

const messagesRoutes: Router = Router();

messagesRoutes.post("/send", makeExpressController(sendMessage));
messagesRoutes.get("/conversation", makeExpressController(getMessages));

export { messagesRoutes };

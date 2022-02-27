import {
  messagesGateway,
  usersGateway,
} from "../DrivenPorts/Persistence/Persistence";
import { notificationManger } from "../DrivenPorts/NotificationsManager/NotificationsManager";
import { tokenManager } from "../DrivenPorts/TokenManager/TokenManager";

import { MessagesServiceFacade } from "../../UseCases/MessagesService/MessagesServiceFacade";

const messagesService = new MessagesServiceFacade(
  tokenManager,
  usersGateway,
  messagesGateway,
  notificationManger
);

export { messagesService };

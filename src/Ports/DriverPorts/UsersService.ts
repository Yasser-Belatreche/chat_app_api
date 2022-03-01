import {
  messagesGateway,
  usersGateway,
} from "../DrivenPorts/Persistence/Persistence";
import { tokenManager } from "../DrivenPorts/TokenManager/TokenManager";

import { UsersServiceFacade } from "../../UseCases/UsersService/UsersServiceFacade";

const usersService = new UsersServiceFacade(
  tokenManager,
  usersGateway,
  messagesGateway
);

export { usersService };
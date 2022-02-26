import type { IConfirmationCodesPersistenceFacade } from "../../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodes.types";
import { ConfirmationCodesPersistencePostgresFacade } from "../../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodesPersistenceFacade";
import { ConfirmationCodesGateway } from "../../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodesGateway";

import type { IMessagesPersistenceFacade } from "../../../Adapters/DrivenAdapters/Persistence/Messages/Message.types";
import { MessagesPresistencePostgresFacade } from "../../../Adapters/DrivenAdapters/Persistence/Messages/MessagesPersistenceFacade";
import { MessagesGateway } from "../../../Adapters/DrivenAdapters/Persistence/Messages/MessagesGateway";

import type { IUserPersistenceFacade } from "../../../Adapters/DrivenAdapters/Persistence/Users/Users.types";
import { UsersPersistencePostgresFacade } from "../../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";
import { UsersGateway } from "../../../Adapters/DrivenAdapters/Persistence/Users/UsersGateway";

import type {
  IConfirmationCodesGateway,
  IMessagesGateway,
  IUsersGateway,
} from "./Persistence.interface";

const usersPersistence: IUserPersistenceFacade =
  new UsersPersistencePostgresFacade();
const usersGateway: IUsersGateway = new UsersGateway(usersPersistence);

const messagesPersistence: IMessagesPersistenceFacade =
  new MessagesPresistencePostgresFacade();
const messagesGateway: IMessagesGateway = new MessagesGateway(
  messagesPersistence
);

const confirmationCodesPersistence: IConfirmationCodesPersistenceFacade =
  new ConfirmationCodesPersistencePostgresFacade();
const confirmationCodesGateway: IConfirmationCodesGateway =
  new ConfirmationCodesGateway(confirmationCodesPersistence);

export { usersGateway, messagesGateway, confirmationCodesGateway };

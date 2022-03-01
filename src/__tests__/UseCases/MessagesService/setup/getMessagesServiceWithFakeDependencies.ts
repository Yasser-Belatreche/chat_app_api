import { MessagesServiceFacade } from "../../../../UseCases/MessagesService/MessagesServiceFacade";
import { fakeDependencies } from "../../../__fakes__/dependencies";

const getMessagesServiceWithFakeDependencies = () => {
  const { tokenManager, usersGateway, messagesGateway, notificationsManager } =
    fakeDependencies;

  return new MessagesServiceFacade(
    tokenManager,
    usersGateway,
    messagesGateway,
    notificationsManager
  );
};

export { getMessagesServiceWithFakeDependencies };

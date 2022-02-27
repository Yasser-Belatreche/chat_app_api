import type {
  IMessagesGateway,
  IUsersGateway,
} from "../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { IMessage } from "../../Domain/Message/Message.types";
import type { INotificationsManager } from "../../Ports/DrivenPorts/NotificationsManager/NotificationsManager.interface";
import type { ITokenManager } from "../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import type { GetMessagesArgs } from "./GetMessages/GetMessagesFactory.types";
import type { SendMessageArgs } from "./SendMessage/SendMessageFactory.types";

import { GetMessagesFactory } from "./GetMessages/GetMessagesFactory";
import { SendMessageFactory } from "./SendMessage/SendMessageFactory";

import type { IMessagesServiceFacade } from "./MessagesServiceFacade.types";

class MessagesServiceFacade implements IMessagesServiceFacade {
  constructor(
    private readonly tokenManager: ITokenManager,
    private readonly usersGateway: IUsersGateway,
    private readonly messagesGateway: IMessagesGateway,
    private readonly notificationsManger: INotificationsManager
  ) {}

  async sendMessage(
    args: SendMessageArgs
  ): Promise<ReturnType<IMessage["messageInfo"]>> {
    const sendMessageFactory = new SendMessageFactory(
      this.tokenManager,
      this.usersGateway,
      this.messagesGateway,
      this.notificationsManger
    );
    return await sendMessageFactory.send(args);
  }

  async getMessages(
    args: GetMessagesArgs
  ): Promise<ReturnType<IMessage["messageInfo"]>[]> {
    const getMessagesFactory = new GetMessagesFactory(
      this.messagesGateway,
      this.tokenManager
    );
    return await getMessagesFactory.getMessage(args);
  }
}

export { MessagesServiceFacade };

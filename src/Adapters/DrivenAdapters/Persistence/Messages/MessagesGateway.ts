import { Message } from "../../../../Domain/Message";

import type { IMessage } from "../../../../Domain/Message/Message.types";
import type { IMessagesGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type {
  GetMessagesArgs,
  IMessagesPersistenceFacade,
  MessageInfo,
} from "./Message.types";

class MessagesGateway implements IMessagesGateway {
  constructor(
    private readonly messagesPersistence: IMessagesPersistenceFacade
  ) {}

  async add(message: IMessage): Promise<IMessage> {
    const messageInfo = await this.messagesPersistence.add(
      message.messageInfo()
    );

    return this.getMessageEntity(messageInfo);
  }

  async getMessages(args: GetMessagesArgs): Promise<IMessage[]> {
    const messagesInfo = await this.messagesPersistence.getMessages(args);

    return messagesInfo.map((info) => this.getMessageEntity(info));
  }

  async getLastMessageWithEveryUser(userId: string): Promise<IMessage[]> {
    const messagesInfo =
      await this.messagesPersistence.getLastMessageWithEveryUser(userId);

    return messagesInfo.map((info) => this.getMessageEntity(info));
  }

  private getMessageEntity(messageInfo: MessageInfo) {
    const { senderId, receiverId, content } = messageInfo;

    const message = new Message({ senderId, receiverId, content });
    message.messageId = messageInfo.messageId;
    message.createdAt = messageInfo.createdAt;
    message.seen = messageInfo.seen;

    return message;
  }
}

export { MessagesGateway };

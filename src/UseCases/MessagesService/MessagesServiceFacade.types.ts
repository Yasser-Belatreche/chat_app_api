import type { IMessage } from "../../Domain/Message/Message.types";
import type { GetMessagesArgs } from "./GetMessages/GetMessagesFactory.types";
import type { SendMessageArgs } from "./SendMessage/SendMessageFactory.types";

export interface IMessagesServiceFacade {
  sendMessage(
    args: SendMessageArgs
  ): Promise<ReturnType<IMessage["messageInfo"]>>;
  getMessages(
    args: GetMessagesArgs
  ): Promise<ReturnType<IMessage["messageInfo"]>[]>;
}

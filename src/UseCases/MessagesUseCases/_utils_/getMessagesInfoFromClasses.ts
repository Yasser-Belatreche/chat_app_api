import { IMessage } from "../../../Domain/Message/Message.Factory";
import { MessageInfo } from "./types";

const getMessagesInfoFromClasses = (messages: IMessage[]): MessageInfo[] => {
  return messages.map((message) => getMessageInfoFromClass(message));
};

const getMessageInfoFromClass = (message: IMessage): MessageInfo => {
  return {
    messageId: message.messageId,
    receiverId: message.receiverId,
    senderId: message.senderId,
    content: message.content,
    seen: message.seen,
    createdAt: message.createdAt,
  };
};

export { getMessageInfoFromClass, getMessagesInfoFromClasses };

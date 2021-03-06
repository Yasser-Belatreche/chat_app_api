import type { IMessage } from "../../../../Domain/Message/Message.types";
import type { IMessagesGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";

interface GetMessagesArgs {
  between: string;
  and: string;
  numOfMessagesPerChunk?: number;
  numOfChunk?: number;
}

class MessagesGatewayFake implements IMessagesGateway {
  private readonly store = new Map<string, IMessage>();

  async add(message: IMessage): Promise<IMessage> {
    this.store.set(message.messageId, message);
    return message;
  }

  async getMessages({
    and: firstUserId,
    between: secondUserId,
    numOfChunk = 1,
    numOfMessagesPerChunk = 20,
  }: GetMessagesArgs): Promise<IMessage[]> {
    const messagesList: IMessage[] = [];

    this.store.forEach((message) => {
      isMessageBetween(message, firstUserId, secondUserId) &&
        messagesList.push(message);
    });
    messagesList.reverse();

    const start = (numOfChunk - 1) * numOfMessagesPerChunk;
    const end = start + numOfMessagesPerChunk;

    return messagesList.slice(start, end);
  }

  async getLastMessageWithEveryUser(userId: string): Promise<IMessage[]> {
    let messages: IMessage[] = [];

    this.store.forEach((message) => {
      if (message.receiverId == userId || message.senderId == userId)
        messages.push(message);
    });

    messages = messages.reduce((acc: IMessage[], message) => {
      const senderId = message.senderId;
      const receiverId = message.receiverId;
      let found = false;

      acc.forEach((uniqueMessage: any) => {
        if (
          (senderId == uniqueMessage.senderId ||
            senderId == uniqueMessage.receiverId) &&
          (receiverId == uniqueMessage.senderId ||
            receiverId == uniqueMessage.receiverId)
        ) {
          found = true;
        }
      });
      !found && acc.push(message);

      return acc;
    }, []);

    return messages;
  }

  deleteAll() {
    this.store.clear();
  }
}

const isMessageBetween = (
  message: IMessage,
  firstUserId: string,
  secondUserId: string
) => {
  return (
    (message.senderId === firstUserId && message.receiverId === secondUserId) ||
    (message.senderId === secondUserId && message.receiverId === firstUserId)
  );
};

export { MessagesGatewayFake };

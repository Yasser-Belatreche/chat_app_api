import { IMessage } from "../../../../Domain/Message/Message.Factory";
import { IMessagesGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";

const repository = new Map<string, IMessage>();

const messagesRepository: IMessagesGateway = {
  add: (message) => {
    repository.set(message.messageId, message);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message);
      }, 2);
    });
  },

  getMessages: async ({
    between: firstUser,
    and: secondUser,
    numOfChunk = 1,
    numOfMessagesPerChunk = 20,
  }) => {
    const messagesList: IMessage[] = [];

    repository.forEach((message) => {
      if (isMessageBetween(message, firstUser, secondUser))
        messagesList.push(message);
    });

    messagesList.sort(sortByCreatedDate);

    const start = (numOfChunk - 1) * numOfMessagesPerChunk;
    const end = start + numOfMessagesPerChunk;

    return messagesList.slice(start, end);
  },

  getLastMessageWithEveryUser: async (userId) => {
    let messages: IMessage[] = [];

    repository.forEach((message) => {
      if (message.receiverId == userId || message.senderId == userId)
        messages.push(message);
    });
    messages.sort(sortByCreatedDate);

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
  },
};

const sortByCreatedDate = (a: any, b: any) => {
  if (a.createdAt > b.createdAt) return -1;
  else if (a.createAt < b.createdAt) return 1;
  return 0;
};

const isMessageBetween = (
  message: any,
  firstUserId: any,
  secondUserId: any
) => {
  return (
    (message.senderId === firstUserId && message.receiverId === secondUserId) ||
    (message.senderId === secondUserId && message.receiverId === firstUserId)
  );
};

export { messagesRepository };

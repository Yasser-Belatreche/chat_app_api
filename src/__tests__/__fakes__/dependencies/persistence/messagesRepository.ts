import { MessagesRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

const repository = new Map();

const messagesRepository: MessagesRepository = {
  add: async (message) => {
    repository.set(message.messageId, message);
    return repository.get(message.messageId);
  },

  getMessages: async ({
    between: firstUser,
    and: secondUser,
    numOfChunk = 1,
    numOfMessagesPerChunk = 20,
  }) => {
    const messagesList: any[] = [];

    repository.forEach((message) => {
      if (isMessageBetween(message, firstUser, secondUser)) {
        messagesList.push(message);
      }
    });

    messagesList.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      else if (a.createAt < b.createdAt) return 1;
      return 0;
    });

    const offset = (numOfChunk - 1) * numOfMessagesPerChunk;

    return messagesList.slice(offset, numOfMessagesPerChunk);
  },
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

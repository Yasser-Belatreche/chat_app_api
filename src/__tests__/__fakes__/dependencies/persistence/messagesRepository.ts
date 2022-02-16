import { MessagesRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

const repository = new Map();

const messagesRepository: MessagesRepository = {
  add: (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        repository.set(message.messageId, message);
        resolve(repository.get(message.messageId));
      }, 2);
    });
  },

  getMessages: async ({
    between: firstUser,
    and: secondUser,
    numOfChunk = 1,
    numOfMessagesPerChunk = 20,
  }) => {
    const messagesList: any[] = [];

    repository.forEach((message) => {
      if (isMessageBetween(message, firstUser, secondUser))
        messagesList.push(message);
    });

    messagesList.sort(sortByCreatedDate);

    const start = (numOfChunk - 1) * numOfMessagesPerChunk;
    const end = start + numOfMessagesPerChunk;

    return messagesList.slice(start, end);
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

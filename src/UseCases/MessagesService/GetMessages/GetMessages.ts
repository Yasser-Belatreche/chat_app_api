import type { Args, Dependencies } from "./GetMessages.types";

const makeGetMessages = ({
  messagesRepository,
  tokenManager,
}: Dependencies) => {
  return async ({
    authToken,
    chatParticipantId,
    numOfChunk = 1,
    numOfMessagesPerChunk = 20,
  }: Args) => {
    const authUserId = tokenManager.decode(authToken);

    const messagesList = await messagesRepository.getMessages({
      between: authUserId,
      and: chatParticipantId,
      numOfChunk,
      numOfMessagesPerChunk,
    });

    return messagesList.map((message) => message.messageInfo());
  };
};

export { makeGetMessages };

import type { Args, Dependencies } from "./GetMessages.types";
import type { MessageInfo } from "../_utils_/types";

const makeGetMessages = ({
  messagesRepository,
  tokenManager,
}: Dependencies) => {
  return async ({
    authToken,
    chatParticipantId,
    numOfChunk,
    numOfMessagesPerChunk,
  }: Args): Promise<MessageInfo[]> => {
    const authUserId = tokenManager.decode(authToken);

    const messagesList = await messagesRepository.getMessages({
      between: authUserId,
      and: chatParticipantId,
      numOfChunk,
      numOfMessagesPerChunk,
    });

    return messagesList.map((message) => ({
      messageId: message.messageId,
      senderId: message.senderId,
      receiverId: message.receiverId,
      content: message.content,
      seen: message.seen,
      createdAt: message.createdAt,
    }));
  };
};

export { makeGetMessages };

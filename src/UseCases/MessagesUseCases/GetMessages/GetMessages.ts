import type { Args, Dependencies } from "./GetMessages.types";
import type { MessageInfo } from "../_utils_/types";
import { getMessagesInfoFromClasses } from "../_utils_/getMessagesInfoFromClasses";

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

    return getMessagesInfoFromClasses(messagesList);
  };
};

export { makeGetMessages };

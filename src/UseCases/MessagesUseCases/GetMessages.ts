import type {
  WithMessagesRepository,
  WithTokenManager,
} from "../_utils_/dependencies.interfaces";

type Dependencies = WithMessagesRepository & WithTokenManager;

interface Args {
  authToken: string;
  chatParticipantId: string;

  /**
   * default to 20
   */
  numOfMessagesPerChunk?: number;

  /**
   * default to 1
   */
  numOfChunk?: number;
}

const makeGetMessages = ({
  messagesRepository,
  tokenManager,
}: Dependencies) => {
  return async ({
    authToken,
    chatParticipantId,
    numOfChunk,
    numOfMessagesPerChunk,
  }: Args) => {
    const authUserId = tokenManager.decode(authToken);

    const messagesList = await messagesRepository.getMessages({
      between: authUserId,
      and: chatParticipantId,
      numOfChunk,
      numOfMessagesPerChunk,
    });

    return messagesList;
  };
};

export { makeGetMessages };

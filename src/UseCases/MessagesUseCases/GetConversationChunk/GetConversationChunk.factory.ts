import {
  WithMessagesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/types";

import { errorMessages } from "../../../utils/ErrorMessages";

type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithMessagesRepository;

interface Args {
  authToken: string;

  /**
   * conversation participant id
   */
  with: string;
  chunkNumber: number;
}

const makeGetConversationChunk = ({
  tokenManager,
  usersRepository,
  messagesRepository,
}: Dependencies) => {
  return async ({ authToken, with: participantId, chunkNumber }: Args) => {
    const authUserId = tokenManager.decode(authToken);

    const participant = await usersRepository.getById(participantId);
    if (!participant) throw new Error(errorMessages.USER_NOT_EXIST);

    return await messagesRepository.getConversationChunk({
      between: authUserId,
      and: participantId,
      chunkNumber,
    });
  };
};

export { makeGetConversationChunk };

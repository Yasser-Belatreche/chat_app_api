import type {
  MessagesRepository,
  UsersRepository,
} from "../../../Ports/DrivenPorts/DB";
import type { TokenManager } from "../../../Ports/DrivenPorts/TokenManager";

import { errorMessages } from "../../../utils/ErrorMessages";

interface Dependencies {
  tokenManager: TokenManager;
  usersRepository: UsersRepository;
  messagesRepository: MessagesRepository;
}

interface Args {
  authToken: string;
  conversationParticipantId: string;
  chunkNumber: number;
}

const makeGetConversationChunk = ({
  tokenManager,
  usersRepository,
  messagesRepository,
}: Dependencies) => {
  return async ({
    authToken,
    conversationParticipantId: participantId,
    chunkNumber,
  }: Args) => {
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

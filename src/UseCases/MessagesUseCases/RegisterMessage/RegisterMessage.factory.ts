import type {
  MessagesRepository,
  UsersRepository,
} from "../../../Ports/DrivenPorts/DB";
import type { IMessage } from "../../../Entities/Message/Message.factory";
import type { TokenManager } from "../../../Ports/DrivenPorts/TokenManager";

import { Message } from "../../../Entities/Message/Message";
import { errorMessages } from "../../../utils/ErrorMessages";

interface Dependencies {
  tokenManager: TokenManager;
  usersRepository: UsersRepository;
  messagesRepository: MessagesRepository;
}

interface Args extends Omit<IMessage, "senderId"> {
  senderToken: string;
}

const makeRegisterMessage = ({
  tokenManager,
  usersRepository,
  messagesRepository,
}: Dependencies) => {
  return async ({ content, receiverId, senderToken }: Args) => {
    const senderId = tokenManager.decode(senderToken);

    const receiver = await usersRepository.getById(receiverId);
    if (!receiver) throw new Error(errorMessages.USER_NOT_EXIST);

    const message = new Message({ senderId, receiverId, content });

    return await messagesRepository.registerNewMessage(message);
  };
};

export { makeRegisterMessage };

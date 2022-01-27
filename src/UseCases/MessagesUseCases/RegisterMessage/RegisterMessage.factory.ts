import type {
  WithMessagesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/types";
import type { IMessage } from "../../../Entities/Message/Message.factory";

import { Message } from "../../../Entities/Message/Message";
import { errorMessages } from "../../../utils/ErrorMessages";

type Dependencies = WithTokenManager &
  WithMessagesRepository &
  WithUsersRepository;

interface Args extends Omit<IMessage, "senderId" | "messageId" | "createdAt"> {
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

import type {
  WithMessagesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../_utils_/dependencies.interfaces";

import { UserNotExist } from "../../utils/Exceptions";
import { Message } from "../../Domain/Message/Message";

type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithMessagesRepository;

interface Args {
  authToken: string;
  receiverId: string;
  content: string;
}

const makeSendMessage = ({
  tokenManager,
  usersRepository,
  messagesRepository,
}: Dependencies) => {
  return async ({ authToken, receiverId, content }: Args) => {
    const authUserId = tokenManager.decode(authToken);

    const sender = await usersRepository.getById(authUserId);
    const receiver = await usersRepository.getById(receiverId);
    if (!sender || !receiver) throw new UserNotExist();

    const message = new Message({
      senderId: sender.userId,
      receiverId: receiver.userId,
      content,
    });

    await messagesRepository.add(message);
  };
};

export { makeSendMessage };

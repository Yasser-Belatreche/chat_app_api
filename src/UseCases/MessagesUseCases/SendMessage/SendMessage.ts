import type { Args, Dependencies } from "./SendMessage.types";
import type { IUser } from "../../../Domain/User/User.Factory";
import type { MessageInfo } from "../_utils_/types";

import { UserNotExist } from "../../../utils/Exceptions";
import { Message } from "../../../Domain/Message/Message";

const makeSendMessage = ({
  tokenManager,
  usersRepository,
  messagesRepository,
}: Dependencies) => {
  return async ({
    authToken,
    receiverId,
    content,
  }: Args): Promise<MessageInfo> => {
    const authUserId = tokenManager.decode(authToken);

    const sender = await usersRepository.getById(authUserId);
    const receiver = await usersRepository.getById(receiverId);

    if (!sender || !receiver) throw new UserNotExist();
    if (!isUsersConfirmed(sender, receiver)) throw new UserNotExist();

    const message = new Message({
      senderId: sender.userId,
      receiverId: receiver.userId,
      content,
    });

    const newMessage = await messagesRepository.add(message);

    return {
      messageId: newMessage.messageId,
      receiverId: newMessage.receiverId,
      senderId: newMessage.senderId,
      content: newMessage.content,
      seen: newMessage.seen,
      createdAt: newMessage.createdAt,
    };
  };
};

const isUsersConfirmed = (first: IUser, second: IUser) => {
  return first.isConfirmed && second.isConfirmed;
};

export { makeSendMessage };

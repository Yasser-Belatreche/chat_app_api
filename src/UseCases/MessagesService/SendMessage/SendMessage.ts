import type { Args, Dependencies } from "./SendMessage.types";
import type { IUser } from "../../../Domain/User/User.types";
import type { IMessage } from "../../../Domain/Message/Message.types";

import { Message } from "../../../Domain/Message";
import { UserNotConfirmed, UserNotExist } from "../../_utils_/Exceptions";

const makeSendMessage = ({
  tokenManager,
  usersRepository,
  messagesRepository,
  notificationsManager,
}: Dependencies) => {
  return async ({
    authToken,
    receiverId,
    content,
  }: Args): Promise<IMessage["messageInfo"]> => {
    const authUserId = tokenManager.decode(authToken);

    const sender = await usersRepository.getById(authUserId);
    const receiver = await usersRepository.getById(receiverId);

    if (!sender || !receiver) throw new UserNotExist();
    if (!isUsersConfirmed(sender, receiver)) throw new UserNotConfirmed();

    const message = new Message({
      senderId: sender.userId,
      receiverId: receiver.userId,
      content,
    });
    message.createdNow();

    const newMessage = await messagesRepository.add(message);

    await notificationsManager.newMessage({
      message: newMessage.messageInfo(),
      sender: sender.userInfo(),
    });

    return newMessage.messageInfo();
  };
};

const isUsersConfirmed = (first: IUser, second: IUser) => {
  return first.isConfirmed && second.isConfirmed;
};

export { makeSendMessage };

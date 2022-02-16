import type { Args, Dependencies } from "./SendMessage.types";
import type { IUser } from "../../../Domain/User/User.Factory";
import type { IMessage } from "../../../Domain/Message/Message.Factory";
import type { MessageInfo } from "../_utils_/types";

import { Message } from "../../../Domain/Message/Message";
import { UserNotExist } from "../../../utils/Exceptions";
import { UserNotConfirmed } from "../../_utils_/Exceptions";
import { getMessageInfoFromClass } from "../_utils_/getMessagesInfoFromClasses";

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
  }: Args): Promise<MessageInfo> => {
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

    const newMessage = await messagesRepository.add(message);

    await notificationsManager.newMessage(
      getNewMessageNotificationArgs(newMessage, sender)
    );

    return getMessageInfoFromClass(newMessage);
  };
};

const isUsersConfirmed = (first: IUser, second: IUser) => {
  return first.isConfirmed && second.isConfirmed;
};

const getNewMessageNotificationArgs = (message: IMessage, sender: IUser) => {
  return {
    receiverId: message.receiverId,
    message: {
      messageId: message.messageId,
      content: message.content,
      createdAt: message.createdAt,
      sender: {
        userId: sender.userId,
        name: sender.name,
      },
    },
  };
};

export { makeSendMessage };

import type { Args, Dependencies } from "./GetContactsList.types";

import { UserNotExist } from "../../_utils_/Exceptions";
import { IUser } from "../../../Domain/User/User.Factory";
import { IMessage } from "../../../Domain/Message/Message.Factory";

const makeGetContactsList = ({
  tokenManager,
  usersRepository,
  messagesRepository,
}: Dependencies) => {
  return async ({ authToken }: Args) => {
    const authUserId = tokenManager.decode(authToken);

    const user = await usersRepository.getById(authUserId);
    if (!user) throw new UserNotExist();

    const messages = await messagesRepository.getLastMessageWithEveryUser(
      user.userId
    );

    const contactsIds = getContactsIds(authUserId, messages);
    const contacts: (IUser | undefined)[] = await Promise.all(
      contactsIds.map((id) => usersRepository.getById(id))
    );

    return messages.map((message, index) => ({
      latestMessage: message.messageInfo(),
      contact: contacts[index]?.userInfo(),
    }));
  };
};

const getContactsIds = (authUserId: string, messages: IMessage[]): string[] => {
  return messages.map((message) => {
    if (message.senderId === authUserId) return message.receiverId;
    else return message.senderId;
  });
};

export { makeGetContactsList };

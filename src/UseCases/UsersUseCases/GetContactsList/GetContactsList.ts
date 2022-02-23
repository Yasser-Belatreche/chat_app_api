import type { Args, Dependencies } from "./GetContactsList.types";
import type { IUser } from "../../../Domain/User/User.types";
import type { IMessage } from "../../../Domain/Message/Message.Factory";

import { UserNotExist } from "../../_utils_/Exceptions";

const makeGetContactsList = ({
  tokenManager,
  usersGateway,
  messagesGateway,
}: Dependencies) => {
  return async ({ authToken }: Args) => {
    const authUserId = tokenManager.decode(authToken);

    const user = await usersGateway.getById(authUserId);
    if (!user) throw new UserNotExist();

    const messages = await messagesGateway.getLastMessageWithEveryUser(
      user.userId
    );

    const contactsIds = getContactsIds(authUserId, messages);
    const contacts: (IUser | undefined)[] = await Promise.all(
      contactsIds.map((id) => usersGateway.getById(id))
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

import {
  IMessagesGateway,
  IUsersGateway,
} from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import type { IUser } from "../../../Domain/User/User.types";
import type { IMessage } from "../../../Domain/Message/Message.types";

class GetContactsListFactory {
  constructor(
    private readonly tokenManager: ITokenManager,
    private readonly usersGateway: IUsersGateway,
    private readonly messagesGateway: IMessagesGateway
  ) {}

  async getList(authToken: string) {
    const authUserId = this.decodeToken(authToken);

    const user = await this.getUserById(authUserId);
    if (!user) this.UserNotExistException();

    const messages = await this.getLastMessagesOf(user.userId);
    const contacts: (IUser | undefined)[] = await this.getContacts(
      authUserId,
      messages
    );

    return messages.map((message, index) => ({
      latestMessage: message.messageInfo(),
      contact: contacts[index]?.userInfo(),
    }));
  }

  private decodeToken(token: string): string {
    return this.tokenManager.decode(token);
  }

  private async getUserById(id: string) {
    return await this.usersGateway.getById(id);
  }

  private async getLastMessagesOf(userId: string) {
    return await this.messagesGateway.getLastMessageWithEveryUser(userId);
  }

  private async getContacts(authUserId: string, messages: IMessage[]) {
    const contactsIds = this.getContactsIds(authUserId, messages);

    return await Promise.all(contactsIds.map((id) => this.getUserById(id)));
  }

  private getContactsIds(authUserId: string, messages: IMessage[]) {
    return messages.map((message) => {
      if (message.senderId === authUserId) return message.receiverId;
      else return message.senderId;
    });
  }

  private UserNotExistException(): never {
    throw new Error("User does not exist");
  }
}

export { GetContactsListFactory };

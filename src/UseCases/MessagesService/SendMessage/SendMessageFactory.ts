import type {
  IMessagesGateway,
  IUsersGateway,
} from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";
import type { INotificationsManager } from "../../../Ports/DrivenPorts/NotificationsManager/NotificationsManager.interface";

import type { IUser } from "../../../Domain/User/User.types";
import type { IMessage } from "../../../Domain/Message/Message.types";
import { Message } from "../../../Domain/Message";

import type { SendMessageArgs } from "./SendMessageFactory.types";

class SendMessageFactory {
  constructor(
    private readonly tokenManager: ITokenManager,
    private readonly usersGateway: IUsersGateway,
    private readonly messagesGateway: IMessagesGateway,
    private readonly notificationManager: INotificationsManager
  ) {}

  async send({ authToken, receiverId, content }: SendMessageArgs) {
    const authUserId = this.decodeToken(authToken);

    const sender = await this.getUserById(authUserId);
    const receiver = await this.getUserById(receiverId);

    if (!sender || !receiver) this.UserNotExistException();
    if (!this.isUsersConfirmed(sender, receiver))
      this.UserNotConfirmedException();

    const message = new Message({
      senderId: sender.userId,
      receiverId: receiver.userId,
      content,
    });
    message.createdNow();

    await this.saveMessage(message);
    this.sendNewMessageNotification(message, sender);

    return message.messageInfo();
  }

  private decodeToken(token: string) {
    return this.tokenManager.decode(token);
  }

  private async getUserById(id: string) {
    return await this.usersGateway.getById(id);
  }

  private isUsersConfirmed(first: IUser, second: IUser) {
    return first.isConfirmed && second.isConfirmed;
  }

  private async saveMessage(message: IMessage) {
    return await this.messagesGateway.add(message);
  }

  private sendNewMessageNotification(message: IMessage, sender: IUser) {
    return this.notificationManager.newMessage({
      message: message.messageInfo(),
      sender: sender.userInfo(),
    });
  }

  private UserNotConfirmedException(): never {
    throw new Error("Cannot perform this action: user not confirmed");
  }

  private UserNotExistException(): never {
    throw new Error("User not exist");
  }
}

export { SendMessageFactory };

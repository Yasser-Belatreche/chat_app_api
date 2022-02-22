import { IMessage } from "../../../Domain/Message/Message.Factory";
import { IUser } from "../../../Domain/User/User.Factory";

interface NewMessageArgs {
  message: ReturnType<IMessage["messageInfo"]>;
  sender: ReturnType<IUser["userInfo"]>;
}

export interface INotificationsManager {
  newMessage(message: NewMessageArgs): Promise<void>;
}

import { IMessage } from "../../../Domain/Message/Message.types";
import { IUser } from "../../../Domain/User/User.types";

interface NewMessageArgs {
  message: ReturnType<IMessage["messageInfo"]>;
  sender: ReturnType<IUser["userInfo"]>;
}

export interface INotificationsManager {
  newMessage(message: NewMessageArgs): Promise<void>;
}

import type { IUser } from "../../../Domain/User/User.types";
import type { IMessage } from "../../../Domain/Message/Message.types";

export interface NewMessageArgs {
  message: ReturnType<IMessage["messageInfo"]>;
  sender: ReturnType<IUser["userInfo"]>;
}

export type NotificationsArgs = {
  NEW_MESSAGE: NewMessageArgs;
  SEEN: ReturnType<IMessage["messageInfo"]>;
};
type Events = keyof NotificationsArgs;

export interface INotificationsEmitter {
  on<T extends Events, R extends NotificationsArgs[T]>(
    event: T,
    callback: (data: R) => void
  ): void;
  emit<T extends Events, R extends NotificationsArgs[T]>(
    event: T,
    data: R
  ): void;
}

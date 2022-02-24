import { IMessage } from "../../../../Domain/Message/Message.types";

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type MessageInfo = NonFunctionProperties<IMessage>;

export interface GetMessagesArgs {
  /**
   * first user id
   */
  between: string;

  /**
   * second user id
   */
  and: string;
  numOfMessagesPerChunk?: number;
  numOfChunk?: number;
}

export interface IMessagesPersistenceFacade {
  add(message: MessageInfo): Promise<MessageInfo>;
  getMessages(args: GetMessagesArgs): Promise<MessageInfo[]>;
  getLastMessageWithEveryUser(userId: string): Promise<MessageInfo[]>;
}

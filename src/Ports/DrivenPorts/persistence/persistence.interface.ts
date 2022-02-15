import type { IConfirmationCode } from "../../../Domain/ConfirmationCode/ConfirmationCode.Factory";
import type { IMessage } from "../../../Domain/Message/Message.Factory";
import type { IUser } from "../../../Domain/User/User.Factory";

export interface UsersRepository {
  add: (user: IUser) => Promise<IUser>;
  getById: (userId: string) => Promise<IUser | undefined>;
  getByEmail: (email: string) => Promise<IUser | undefined>;
  update: (user: IUser) => Promise<IUser>;
}

export interface ConfirmationCodesRepository {
  add: (confirmationCode: IConfirmationCode) => Promise<IConfirmationCode>;
  find: (email: string) => Promise<IConfirmationCode | undefined>;
  delete: (email: string) => Promise<IConfirmationCode | undefined>;
  update: (
    confirmationCode: IConfirmationCode
  ) => Promise<IConfirmationCode | undefined>;
}

interface ToGetMessages {
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

export interface MessagesRepository {
  add: (message: IMessage) => Promise<IMessage>;
  getMessages: (args: ToGetMessages) => Promise<IMessage[]>;
}

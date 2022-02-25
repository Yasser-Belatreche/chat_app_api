import type { IConfirmationCode } from "../../../Domain/ConfirmationCode/ConfirmationCode.types";
import type { IMessage } from "../../../Domain/Message/Message.types";
import type { IUser } from "../../../Domain/User/User.types";

export interface IUsersGateway {
  add(user: IUser): Promise<IUser>;
  getById(userId: string): Promise<IUser | undefined>;
  getByEmail(email: string): Promise<IUser | undefined>;
  update(user: IUser): Promise<IUser>;
  searchFor(keyword: string): Promise<IUser[]>;
}

export interface IConfirmationCodesGateway {
  add(confirmationCode: IConfirmationCode): Promise<IConfirmationCode>;
  find(email: string): Promise<IConfirmationCode | undefined>;
  delete(email: string): Promise<IConfirmationCode>;
  update(confirmationCode: IConfirmationCode): Promise<IConfirmationCode>;
}

interface GetMessagesArgs {
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

export interface IMessagesGateway {
  add(message: IMessage): Promise<IMessage>;
  getMessages(args: GetMessagesArgs): Promise<IMessage[]>;
  getLastMessageWithEveryUser(userId: string): Promise<IMessage[]>;
}

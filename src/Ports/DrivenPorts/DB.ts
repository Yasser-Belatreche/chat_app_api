import type { IUser } from "../../Entities/User/User.factory";
import type { IMessage } from "../../Entities/Message/Message.factory";
import type {
  PartilaUserWithIdOrEmail,
  ToGetConversation,
  VerificationCode,
  ReturnedUser,
} from "./_utils_/types";

interface Options {
  /**
   * whether you return the password or not, default to false
   */
  withPassword?: boolean;

  /**
   * whether you return just the users with confirmed email, or return anyone, default to false, if you set it to true, you will get an "isConfirmed" property
   */
  getNonConfirmed?: boolean;
}

export interface UsersRepository {
  getByEmail: (
    email: string,
    options?: Options
  ) => Promise<ReturnedUser | undefined>;
  getById: (id: string, options?: Options) => Promise<ReturnedUser | undefined>;
  registerNewUser: (user: IUser & { name: string }) => Promise<ReturnedUser>;
  confirmUser: (email: string) => Promise<ReturnedUser>;
  searchForUsers: (keyword: string) => Promise<ReturnedUser[]>;
}

export interface VerificationCodesRepository {
  addCode: (code: VerificationCode) => Promise<VerificationCode>;
  getCode: (args: { email: string }) => Promise<number | undefined>;
  deleteCode: (args: { email: string }) => Promise<undefined>;
}

export interface MessagesRepository {
  registerNewMessage: (message: IMessage) => Promise<IMessage>;
  getConversationChunk: (args: ToGetConversation) => Promise<IMessage[]>;
}

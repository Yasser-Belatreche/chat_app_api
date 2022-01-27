import type { IUser } from "../../Entities/User/User.factory";
import type { IMessage } from "../../Entities/Message/Message.factory";
import type { ToGetConversation, VerificationCode } from "./_utils_/types";

export interface UsersRepository {
  getByEmail: (email: string) => Promise<IUser | undefined>;
  getById: (id: string) => Promise<IUser | undefined>;
  registerNewUser: (user: IUser) => Promise<IUser>;
  confirmUser: (email: string) => Promise<IUser>;
  searchForUsers: (keyword: string) => Promise<IUser[]>;
}

export interface VerificationCodesRepository {
  addCode: (code: VerificationCode) => Promise<VerificationCode>;
  getCode: (email: string) => Promise<number | undefined>;
  deleteCode: (email: string) => Promise<undefined>;
}

export interface MessagesRepository {
  registerNewMessage: (message: IMessage) => Promise<IMessage>;
  getConversationChunk: (args: ToGetConversation) => Promise<IMessage[]>;
}

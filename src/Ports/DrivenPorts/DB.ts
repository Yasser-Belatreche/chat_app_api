import type { IUser } from "../../Entities/User/User.factory";
import type { IMessage } from "../../Entities/Message/Message.factory";
import type {
  PartilaUserWithIdOrEmail,
  ToGetConversation,
  VerificationCode,
} from "./_utils_/types";

export interface UsersRepository {
  getByEmail: (email: string) => Promise<IUser | undefined>;
  getById: (id: string) => Promise<IUser | undefined>;
  registerNewUser: (user: IUser) => Promise<IUser>;
  updateUser: (user: PartilaUserWithIdOrEmail) => Promise<IUser>;
  searchForUsers: (keyword: string) => Promise<IUser[]>;
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

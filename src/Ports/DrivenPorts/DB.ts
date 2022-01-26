import type { IUser } from "../../Entities/User/User.factory";
import type { IMessage } from "../../Entities/Message/Message.factory";
import type {
  PartilaUserWithIdOrEmail,
  ToGetConversation,
  VerificationCode,
  ReturnedUser,
} from "./_utils_/types";

export interface UsersRepository {
  getByEmail: (email: string) => Promise<ReturnedUser | undefined>;
  getById: (id: string) => Promise<ReturnedUser | undefined>;
  registerNewUser: (user: IUser) => Promise<ReturnedUser>;
  updateUser: (user: PartilaUserWithIdOrEmail) => Promise<ReturnedUser>;
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

import type { IUser } from "../../Entities/User/User.factory";
import type { IMessage } from "../../Entities/Message/Message.factory";

type PartialUserWithId = Partial<IUser> & { userId: string };
type PartialUserWithEmail = Partial<IUser> & { email: string };
type PartilaUserWithIdOrEmail = PartialUserWithId | PartialUserWithEmail;

export interface UsersRepository {
  getByEmail: (email: string) => Promise<IUser | undefined>;
  getById: (id: string) => Promise<IUser | undefined>;
  registerNewUser: (user: IUser) => Promise<IUser>;
  updateUser: (user: PartilaUserWithIdOrEmail) => Promise<IUser>;
}

type VerificationCode = {
  email: string;
  verificationCode: number;
};
export interface VerificationCodesRepository {
  addCode: (code: VerificationCode) => Promise<VerificationCode>;
  getCode: (args: { email: string }) => Promise<number | undefined>;
  deleteCode: (args: { email: string }) => Promise<undefined>;
}

export interface MessagesRepository {
  registerNewMessage: (message: IMessage) => Promise<IMessage>;
  getConversationChunk: (args: {
    between: string;
    and: string;
    chunkNumber: number;
  }) => Promise<IMessage[]>;
}

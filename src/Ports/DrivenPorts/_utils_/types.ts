import { IUser } from "../../../Entities/User/User.factory";

type PartialUserWithId = Partial<IUser> & { userId: string };
type PartialUserWithEmail = Partial<IUser> & { email: string };

export type PartilaUserWithIdOrEmail = PartialUserWithId | PartialUserWithEmail;

export type VerificationCode = {
  email: string;
  verificationCode: number;
};

export type ToGetConversation = {
  between: string;
  and: string;
  chunkNumber: number;
};

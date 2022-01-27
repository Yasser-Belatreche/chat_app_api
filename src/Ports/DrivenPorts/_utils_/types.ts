import { IUser } from "../../../Entities/User/User.factory";

type PartialUserWithId = Partial<IUser> & { userId: string };
type PartialUserWithEmail = Partial<IUser> & { email: string };

export type PartilaUserWithIdOrEmail = PartialUserWithId | PartialUserWithEmail;

export type ReturnedUser = {
  userId: string;
  name: string;
  email: string;
  password?: string;
  isConfirmed?: true;
};

export type VerificationCode = {
  email: string;
  verificationCode: number;
};

export type ToGetConversation = {
  /**
   * first user Id
   */
  between: string;

  /**
   * second user Id
   */
  and: string;

  /**
   * maximun number of messages to return
   */
  limit?: number;
  chunkNumber: number;
};

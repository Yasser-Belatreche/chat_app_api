import { IUser } from "../../Entities/User/User.factory";

type PartialUserWithId = Partial<IUser> & { userId: string };
type PartialUserWithEmail = Partial<IUser> & { email: string };

type PartilaUserWithIdOrEmail = PartialUserWithId | PartialUserWithEmail;

export interface UserRepository {
  getByEmail: (email: string) => Promise<IUser | undefined>;
  registerNewUser: (user: IUser) => Promise<IUser>;
  updateUser: (user: PartilaUserWithIdOrEmail) => Promise<IUser>;
}

type VerificationCode = {
  email: string;
  verificationCode: number;
};
export interface VerificationCodeRepository {
  addCode: (code: VerificationCode) => Promise<VerificationCode>;
  getCode: (args: { email: string }) => Promise<number | undefined>;
  deleteCode: (args: { email: string }) => Promise<undefined>;
}

import { IUser } from "../../Entities/User/User.factory";

export interface UserRepository {
  getByEmail: (email: string) => Promise<IUser | undefined>;
  registerNewUser: (user: IUser) => Promise<IUser>;
  updateUser: (
    user:
      | (Partial<IUser> & { userId: string })
      | (Partial<IUser> & { email: string })
  ) => Promise<IUser>;
}

export interface VerificationCodeRepository {
  addCode: (code: {
    email: string;
    verificationCode: number;
  }) => Promise<{ email: string; verificationCode: number }>;
  getCode: (args: { email: string }) => Promise<number | undefined>;
  deleteCode: (args: { email: string }) => Promise<undefined>;
}

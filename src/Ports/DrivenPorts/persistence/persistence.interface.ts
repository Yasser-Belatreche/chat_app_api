import { IConfirmationCode } from "../../../Domain/ConfirmationCode/ConfirmationCode.Factory";
import { IUser } from "../../../Domain/User/User.Factory";

export interface UsersRepository {
  add: (user: IUser) => Promise<IUser>;
  getById: (userId: string) => Promise<IUser | undefined>;
  getByEmail: (email: string) => Promise<IUser | undefined>;
  update: (user: IUser) => Promise<IUser>;
}

export interface ConfirmationCodesRepository {
  find: (email: string) => Promise<IConfirmationCode | undefined>;
  delete: (email: string) => Promise<IConfirmationCode | undefined>;
  update: (
    confirmationCode: IConfirmationCode
  ) => Promise<IConfirmationCode | undefined>;
  add: (
    confirmationCode: IConfirmationCode
  ) => Promise<IConfirmationCode | undefined>;
}

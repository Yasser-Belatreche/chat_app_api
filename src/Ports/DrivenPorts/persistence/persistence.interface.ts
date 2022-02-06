import { IUser } from "../../../Domain/User/User.Factory";

export interface UsersRepository {
  add: (user: IUser) => Promise<IUser>;
  getById: (userId: string) => Promise<IUser | undefined>;
  getByEmail: (email: string) => Promise<IUser | undefined>;
}

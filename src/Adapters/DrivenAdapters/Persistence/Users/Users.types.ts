import { IUser } from "../../../../Domain/User/User.types";

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type UserInfo = NonFunctionProperties<IUser>;

export interface IUserPersistenceFacade {
  add(user: UserInfo): Promise<UserInfo>;
  getByEmail(email: string): Promise<UserInfo | undefined>;
  getById(id: string): Promise<UserInfo | undefined>;
  update(user: UserInfo): Promise<UserInfo>;
  searchFor(keyword: string): Promise<UserInfo[]>;
}

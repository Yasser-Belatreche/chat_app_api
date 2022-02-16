import { IUser } from "../../Domain/User/User.Factory";

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type UserInfo = Omit<NonFunctionProperties<IUser>, "password">;

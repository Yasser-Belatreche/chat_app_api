import { WithIdGenerator } from "../_utils_/Dependencies.interfaces";
import { NonFunctionProperties } from "../_utils_/Type";

export type Dependencies = WithIdGenerator;

export interface IUser {
  userId: string;
  name: string;
  email: string;
  password: string;
  isConfirmed: boolean;
  createdAt: string;
  userInfo(): NonFunctionProperties<IUser>;
  newRegistered(name: string): void;
  confirm(): void;
}

export interface EmailAndPassword {
  email: string;
  password: string;
}

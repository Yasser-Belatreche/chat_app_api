import { WithIdGenerator } from "../_utils_/Dependencies.interfaces";
import { NonFunctionProperties } from "../_utils_/Type";

export type Dependencies = WithIdGenerator;

export interface IUser {
  email: string;
  password: string;
  userId: string;
  name: string;
  createdAt: string;
  isConfirmed: boolean;
  userInfo(): NonFunctionProperties<IUser>;
  newRegistered(name: string): void;
  confirm(): void;
}

export interface EmailAndPassword {
  email: string;
  password: string;
}

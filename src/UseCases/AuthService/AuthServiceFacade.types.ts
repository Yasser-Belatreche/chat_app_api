import type { IUser } from "../../Domain/User/User.types";
import type { ConfirmationArgs } from "./ConfirmUser/ConfirmUserFactory.types";
import type { LoginArgs } from "./Login/LoginFactory.types";
import type { RegisterArgs } from "./RegisterUser/RegsiterUserFactory.types";

export type Dependencies = {};

export interface IAuthServiceFacade {
  login(args: LoginArgs): Promise<string>;
  register(args: RegisterArgs): Promise<string>;
  sendConfirmationCode(email: string): Promise<number>;
  confirmUser(args: ConfirmationArgs): Promise<ReturnType<IUser["userInfo"]>>;
}

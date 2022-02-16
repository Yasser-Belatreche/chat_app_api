import type { IUser } from "../../../Domain/User/User.Factory";
import type {
  WithConfirmationCodesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/dependencies.interfaces";
import type { NonFunctionProperties } from "../../_utils_/types";

export type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithConfirmationCodesRepository;

export interface Args {
  authToken: string;
  code: number;
}

export type UserInfo = Omit<NonFunctionProperties<IUser>, "password">;

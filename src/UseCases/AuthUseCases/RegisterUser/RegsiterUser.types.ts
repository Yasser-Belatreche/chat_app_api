import type {
  WithPasswordManager,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/dependencies.interfaces";

export type Dependencies = WithUsersRepository &
  WithPasswordManager &
  WithTokenManager;

export interface Args {
  name: string;
  email: string;
  password: string;
}

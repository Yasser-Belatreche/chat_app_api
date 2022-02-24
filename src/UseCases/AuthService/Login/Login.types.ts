import type {
  WithPasswordManager,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/Dependencies.interfaces";

export type Dependencies = WithUsersRepository &
  WithPasswordManager &
  WithTokenManager;

export interface Args {
  email: string;
  password: string;
}

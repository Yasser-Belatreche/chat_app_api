import type {
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/Dependencies.interfaces";

export type Dependencies = WithTokenManager & WithUsersRepository;

export interface Args {
  authToken: string;
  searchKeyword: string;
}

import type {
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/dependencies.interfaces";

export type Dependencies = WithTokenManager & WithUsersRepository;

export interface Args {
  authToken: string;
  searchKeyword: string;
}

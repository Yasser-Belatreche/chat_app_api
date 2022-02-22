import type {
  WithMessagesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/Dependencies.interfaces";

export type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithMessagesRepository;

export interface Args {
  authToken: string;
}

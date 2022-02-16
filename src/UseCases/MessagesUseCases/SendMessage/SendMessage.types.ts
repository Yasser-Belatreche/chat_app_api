import type {
  WithMessagesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/dependencies.interfaces";

export type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithMessagesRepository;

export interface Args {
  authToken: string;
  receiverId: string;
  content: string;
}

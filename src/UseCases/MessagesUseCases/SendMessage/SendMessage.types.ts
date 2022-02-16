import type {
  WithMessagesRepository,
  WithNotificationsManager,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/dependencies.interfaces";

export type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithMessagesRepository &
  WithNotificationsManager;

export interface Args {
  authToken: string;
  receiverId: string;
  content: string;
}

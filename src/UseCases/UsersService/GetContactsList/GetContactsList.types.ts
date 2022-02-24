import type {
  WithMessagesGateway,
  WithTokenManager,
  WithUsersGateway,
} from "../../_utils_/Dependencies.interfaces";

export type Dependencies = WithTokenManager &
  WithUsersGateway &
  WithMessagesGateway;

export interface Args {
  authToken: string;
}

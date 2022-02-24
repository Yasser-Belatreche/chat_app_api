import type {
  WithConfirmationCodesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/Dependencies.interfaces";

export type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithConfirmationCodesRepository;

export interface Args {
  authToken: string;
  code: number;
}

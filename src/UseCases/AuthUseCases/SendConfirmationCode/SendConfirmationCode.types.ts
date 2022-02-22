import type {
  WithConfirmationCodesRepository,
  WithEmailService,
  WithUsersRepository,
} from "../../_utils_/Dependencies.interfaces";

export type Dependencies = WithUsersRepository &
  WithConfirmationCodesRepository &
  WithEmailService;

export interface Args {
  email: string;
}

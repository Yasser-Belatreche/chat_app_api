import type {
  WithPasswordManager,
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/types";

import { User } from "../../../Entities/User/User";
import { errorMessages } from "../../../utils/ErrorMessages";

type Dependencies = WithTokenManager &
  WithPasswordManager &
  WithUsersRepository;

interface LoginBody {
  email: string;
  password: string;
}

const makeLogin = ({
  usersRepository,
  passwordManager,
  tokenManager,
}: Dependencies) => {
  return async (args: LoginBody) => {
    const email = args.email.trim().toLowerCase();
    const password = args.password.trim();

    const realUser = await usersRepository.getByEmail(email);

    if (!realUser) throw new Error(errorMessages.CREDENTIALS_ERROR);

    const isMatch = passwordManager.compareHashWithLiteral({
      hash: realUser.password,
      literal: password,
    });
    if (!isMatch) throw new Error(errorMessages.CREDENTIALS_ERROR);

    const userToken = tokenManager.generateToken(realUser.userId);

    return userToken;
  };
};

export { makeLogin };

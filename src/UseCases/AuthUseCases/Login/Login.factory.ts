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
    const user = new User(args);
    const realUser = await usersRepository.getByEmail(user.email, {
      withPassword: true,
    });

    if (!realUser) throw new Error(errorMessages.USER_NOT_EXIST);

    const isMatch = passwordManager.compareHashWithLiteral({
      hash: realUser.password,
      literal: user.password,
    });
    if (!isMatch) throw new Error(errorMessages.WRONG_PASSWORD);

    const userToken = tokenManager.generateToken(realUser.userId);

    return userToken;
  };
};

export { makeLogin };

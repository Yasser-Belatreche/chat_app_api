import type { UsersRepository } from "../../../Ports/DrivenPorts/DB";
import type { TokenManager } from "../../../Ports/DrivenPorts/TokenManager";
import type { PasswordManager } from "../../../Ports/DrivenPorts/PasswordManager";

import { User } from "../../../Entities/User/User";
import { errorMessages } from "../../../utils/ErrorMessages";

interface Dependencies {
  usersRepository: UsersRepository;
  passwordManager: PasswordManager;
  tokenManager: TokenManager;
}

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
    const realUser = await usersRepository.getByEmail(user.email);

    if (!realUser) throw new Error(errorMessages.USER_NOT_EXIST);

    const isMatch = passwordManager.compareHashWithLiteral({
      hash: realUser.password,
      literal: user.password,
    });
    if (!isMatch) throw new Error(errorMessages.WRONG_PASSWORD);

    const userToken = tokenManager.generateToken(realUser.userId);

    return `Bearer ${userToken}`;
  };
};

export { makeLogin };

import type { UserRepository } from "../../../Ports/DrivenPorts/DB";
import type { Token } from "../../../Ports/DrivenPorts/Token";
import type { PasswordManager } from "../../../Ports/DrivenPorts/PasswordManager";

import { User } from "../../../Entities/User/User";
import { errorMessages } from "../../../utils/ErrorMessages";

interface Dependencies {
  userRepository: UserRepository;
  passwordManager: PasswordManager;
  token: Token;
}

interface LoginBody {
  email: string;
  password: string;
}

const makeLogin = ({
  userRepository,
  passwordManager,
  token,
}: Dependencies) => {
  return async (args: LoginBody) => {
    const user = new User(args);
    const realUser = await userRepository.getByEmail(user.email);

    if (!realUser) throw new Error(errorMessages.USER_NOT_EXIST);

    const isMatch = passwordManager.compareHashWithLiteral({
      hash: realUser.password,
      literal: user.password,
    });
    if (!isMatch) throw new Error(errorMessages.WRONG_PASSWORD);

    const userToken = token.generateToken(realUser.userId);

    return `Bearer ${userToken}`;
  };
};

export { makeLogin };

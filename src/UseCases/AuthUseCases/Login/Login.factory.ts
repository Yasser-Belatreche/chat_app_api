import type { UserRepository } from "../../../Ports/DrivenPorts/DB";
import type { Token } from "../../../Ports/DrivenPorts/Token";

import { User } from "../../../Entities/User/User";

interface Dependencies {
  userRepository: UserRepository;
  passwordManager: {
    compareHashWithLiteral: (arg: { hash: string; literal: string }) => boolean;
  };
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

    if (!realUser) throw new Error("no user associated with this email");

    const isMatch = passwordManager.compareHashWithLiteral({
      hash: realUser.password,
      literal: user.password,
    });
    if (!isMatch) throw new Error("wrong credentials");

    const userToken = token.generateToken(realUser.userId);

    return `Bearer ${userToken}`;
  };
};

export { makeLogin };

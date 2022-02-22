import type { Args, Dependencies } from "./Login.types";

import { User } from "../../../Domain/User/User";
import { InvalidCredentials } from "../_utils_/Exceptions";

const makeLogin = ({
  usersRepository,
  passwordManager,
  tokenManager,
}: Dependencies) => {
  return async (args: Args): Promise<string> => {
    const userWantToLogin = new User(args);

    const userInDb = await usersRepository.getByEmail(userWantToLogin.email);
    if (!userInDb) throw new InvalidCredentials();

    const isCorrectPassword = await passwordManager.isHashMatchLiteral({
      hash: userInDb.password,
      literal: userWantToLogin.password,
    });
    if (!isCorrectPassword) throw new InvalidCredentials();

    const token = tokenManager.generateToken(userInDb.userId);

    return token;
  };
};

export { makeLogin };

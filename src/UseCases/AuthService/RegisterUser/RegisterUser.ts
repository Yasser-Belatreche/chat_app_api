import type { Args, Dependencies } from "./RegsiterUser.types";

import { EmailAlreadyUsed } from "../_utils_/Exceptions";
import { User } from "../../../Domain/User";

const makeRegisterUser = ({
  usersRepository,
  passwordManager,
  tokenManager,
}: Dependencies) => {
  return async (args: Args): Promise<string> => {
    const user = new User({ email: args.email, password: args.password });

    const userInDb = await usersRepository.getByEmail(user.email);
    if (userInDb) throw new EmailAlreadyUsed();

    user.isANewRegistred(args.name);
    user.password = await passwordManager.hash(user.password);

    await usersRepository.add(user);

    const token = tokenManager.generateToken(user.userId);

    return token;
  };
};

export { makeRegisterUser };

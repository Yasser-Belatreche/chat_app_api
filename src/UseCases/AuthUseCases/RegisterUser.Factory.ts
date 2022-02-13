import type {
  WithPasswordManager,
  WithTokenManager,
  WithUsersRepository,
} from "../_utils_/dependencies.interfaces";

import { EmailAlreadyUsed } from "../../utils/Exceptions";
import { User } from "../../Domain/User/User";

type Dependencies = WithUsersRepository &
  WithPasswordManager &
  WithTokenManager;

interface Args {
  name: string;
  email: string;
  password: string;
}

const makeRegisterUser = ({
  usersRepository,
  passwordManager,
  tokenManager,
}: Dependencies) => {
  return async (args: Args): Promise<string> => {
    const user = new User({ email: args.email, password: args.password });
    user.isANewRegistred(args.name);

    user.password = passwordManager.hash(user.password);

    const userInDb = await usersRepository.getByEmail(user.email);
    if (userInDb) throw new EmailAlreadyUsed();

    await usersRepository.add(user);

    const token = tokenManager.generateToken(user.userId);

    return token;
  };
};

export { makeRegisterUser };

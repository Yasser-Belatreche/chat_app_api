import type {
  WithPasswordManager,
  WithUsersRespository,
} from "../_utils_/dependencies.interfaces";

import { EmailAlreadyUsed } from "../../utils/Exceptions";
import { User } from "../../Domain/User/User";

type Dependencies = WithUsersRespository & WithPasswordManager;

interface Args {
  name: string;
  email: string;
  password: string;
}

const makeRegisterUser = ({
  usersRepository,
  passwordManager,
}: Dependencies) => {
  return async (args: Args) => {
    const user = new User({ email: args.email, password: args.password });
    user.isANewRegistred(args.name);

    user.password = passwordManager.hash(user.password);

    const userInDb = await usersRepository.getByEmail(user.email);
    if (userInDb) throw new EmailAlreadyUsed();

    return await usersRepository.add(user);
  };
};

export { makeRegisterUser };

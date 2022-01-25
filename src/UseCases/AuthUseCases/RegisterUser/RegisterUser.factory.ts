import type {
  WithPasswordManager,
  WithUsersRepository,
} from "../../_utils_/types";

import { User } from "../../../Entities/User/User";
import { errorMessages } from "../../../utils/ErrorMessages";

type Dependencies = WithUsersRepository & WithPasswordManager;

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

const makeRegisterUser = ({
  usersRepository,
  passwordManager,
}: Dependencies) => {
  return async (args: SignupBody) => {
    const user = new User(args);

    const realUser = await usersRepository.getByEmail(user.email);

    if (realUser) throw new Error(errorMessages.USED_EMAIL);

    const newUser = await usersRepository.registerNewUser({
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: passwordManager.generateHash(user.password),
      isConfirmed: user.isConfirmed,
    });

    return newUser;
  };
};

export { makeRegisterUser };

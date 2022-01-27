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

    user.password = passwordManager.generateHash(user.password);

    return await usersRepository.registerNewUser(user);
  };
};

export { makeRegisterUser };

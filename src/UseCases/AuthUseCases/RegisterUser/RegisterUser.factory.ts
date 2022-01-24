import type { UserRepository } from "../../../Ports/DrivenPorts/DB";
import type { PasswordManager } from "../../../Ports/DrivenPorts/PasswordManager";

import { User } from "../../../Entities/User/User";
import { errorMessages } from "../../../utils/ErrorMessages";

interface Dependences {
  userRepository: UserRepository;
  passwordManager: PasswordManager;
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

const makeRegisterUser = ({ userRepository, passwordManager }: Dependences) => {
  return async (args: SignupBody) => {
    const user = new User(args);

    const realUser = await userRepository.getByEmail(user.email);

    if (realUser) throw new Error(errorMessages.USED_EMAIL);

    const newUser = await userRepository.registerNewUser({
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

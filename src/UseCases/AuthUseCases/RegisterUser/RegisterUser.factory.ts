import type { UserRepository } from "../../../Ports/DrivenPorts/DB";
import { User } from "../../../Entities/User/User";

interface Dependences {
  userRepository: UserRepository;
  passwordManager: {
    generateHash: (passwordLiteral: string) => string;
  };
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

    if (realUser) throw new Error("email already used");

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

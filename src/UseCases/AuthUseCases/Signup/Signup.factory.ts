import { User } from "../../../Entities/User/User";
import type { IUser } from "../../../Entities/User/User.factory";

import { generateRandomCode } from "./_utils_/generateRandomCode";

interface Dependences {
  userRepository: {
    getByEmail: (email: string) => Promise<IUser | undefined>;
    registerNewUser: (user: IUser) => Promise<IUser>;
  };
  passwordManager: {
    generateHash: (passwordLiteral: string) => string;
  };
}

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

const makeSignup =
  ({ userRepository, passwordManager }: Dependences) =>
  async (args: SignupBody) => {
    const user = new User(args);

    const realUser = await userRepository.getByEmail(user.email);

    if (realUser) throw new Error("email already used");

    await userRepository.registerNewUser({
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: passwordManager.generateHash(user.password),
      isConfirmed: user.isConfirmed,
    });

    return generateRandomCode();
  };

export { makeSignup };

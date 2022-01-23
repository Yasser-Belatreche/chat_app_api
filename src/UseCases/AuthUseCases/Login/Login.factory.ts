import { User } from "../../../Entities/User/User";
import type { IUser } from "../../../Entities/User/User.factory";

interface Dependencies {
  userRepository: {
    getByEmail: (email: string) => Promise<IUser | undefined>;
  };
  passwordManager: {
    compareHashWithLiteral: (arg: { hash: string; literal: string }) => boolean;
  };
  Token: {
    generateToken: (id: string) => string;
  };
}

interface LoginBody {
  email: string;
  password: string;
}

const makeLogin =
  ({ userRepository, passwordManager, Token }: Dependencies) =>
  async (args: LoginBody) => {
    const user = new User(args);
    const realUser = await userRepository.getByEmail(user.email);

    if (!realUser) throw new Error("no user associated with this email");

    const isMatch = passwordManager.compareHashWithLiteral({
      hash: realUser.password,
      literal: user.password,
    });
    if (!isMatch) throw new Error("wrong credentials");

    const token = Token.generateToken(realUser.userId);

    return `Bearer ${token}`;
  };

export { makeLogin };

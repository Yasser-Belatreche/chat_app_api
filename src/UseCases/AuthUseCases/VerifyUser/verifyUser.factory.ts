import type {
  UserRepository,
  VerificationCodeRepository,
} from "../../../Ports/DrivenPorts/DB";
import type { Token } from "../../../Ports/DrivenPorts/Token";

interface Dependencies {
  userRepository: UserRepository;
  verificationCodeRepository: VerificationCodeRepository;
  token: Token;
}

interface Args {
  email: string;
  verificationCode: number;
}

const makeVerifyUser = ({
  userRepository,
  verificationCodeRepository,
  token,
}: Dependencies) => {
  return async ({ email: unformattedEmail, verificationCode }: Args) => {
    const email = unformattedEmail.trim().toLocaleLowerCase();

    const code = await verificationCodeRepository.getCode({
      email,
    });

    if (!code) throw new Error("no confirmation code for this user");
    if (code !== verificationCode) throw new Error("wrong verification code");

    await verificationCodeRepository.deleteCode({ email });
    const user = await userRepository.updateUser({ email, isConfirmed: true });

    const userToken = token.generateToken(user.userId);

    return `Bearer ${userToken}`;
  };
};

export { makeVerifyUser };

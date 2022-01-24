import type {
  UserRepository,
  VerificationCodeRepository,
} from "../../../Ports/DrivenPorts/DB";
import type { Token } from "../../../Ports/DrivenPorts/Token";

import { errorMessages } from "../../../utils/ErrorMessages";

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

    if (!code) throw new Error(errorMessages.USER_HAS_NO_VERIFICATION_CODE);
    if (code !== verificationCode)
      throw new Error(errorMessages.WRONG_VERIFICATION_CODE);

    await verificationCodeRepository.deleteCode({ email });
    const user = await userRepository.updateUser({ email, isConfirmed: true });

    const userToken = token.generateToken(user.userId);

    return `Bearer ${userToken}`;
  };
};

export { makeVerifyUser };

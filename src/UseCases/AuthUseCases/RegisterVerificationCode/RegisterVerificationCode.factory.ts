import type {
  UserRepository,
  VerificationCodeRepository,
} from "../../../Ports/DrivenPorts/DB";

import { generateRandomCode } from "./_utils_/generateRandomCode";
import { errorMessages } from "../../../utils/ErrorMessages";

interface Dependences {
  userRepository: UserRepository;
  verificationCodeRepository: VerificationCodeRepository;
}

interface Args {
  email: string;
}

const makeRegisterVerificationCode = ({
  userRepository,
  verificationCodeRepository,
}: Dependences) => {
  return async ({ email }: Args) => {
    const formattedEmail = email.trim().toLowerCase();

    const user = await userRepository.getByEmail(formattedEmail);

    if (!user) throw new Error(errorMessages.USER_NOT_EXIST);

    const verificationCode = generateRandomCode();

    await verificationCodeRepository.addCode({
      email: user.email,
      verificationCode,
    });

    return verificationCode;
  };
};

export { makeRegisterVerificationCode };

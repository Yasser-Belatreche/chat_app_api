import type {
  WithUsersRepository,
  WithVerificationCodesRepository,
} from "../../_utils_/types";

import { generateRandomCode } from "./_utils_/generateRandomCode";
import { errorMessages } from "../../../utils/ErrorMessages";

type Dependencies = WithUsersRepository & WithVerificationCodesRepository;

interface Args {
  email: string;
}

const makeRegisterVerificationCode = ({
  usersRepository,
  verificationCodesRepository,
}: Dependencies) => {
  return async ({ email }: Args) => {
    const formattedEmail = email.trim().toLowerCase();

    const user = await usersRepository.getByEmail(formattedEmail);

    if (!user) throw new Error(errorMessages.USER_NOT_EXIST);

    const verificationCode = generateRandomCode();

    await verificationCodesRepository.addCode({
      email: user.email,
      verificationCode,
    });

    return verificationCode;
  };
};

export { makeRegisterVerificationCode };

import type {
  WithTokenManager,
  WithUsersRepository,
  WithVerificationCodesRepository,
} from "../../_utils_/types";

import { errorMessages } from "../../../utils/ErrorMessages";

type Dependencies = WithVerificationCodesRepository &
  WithUsersRepository &
  WithTokenManager;

interface Args {
  email: string;
  verificationCode: number;
}

const makeVerifyUser = ({
  usersRepository,
  verificationCodesRepository,
  tokenManager,
}: Dependencies) => {
  return async ({ email: unformattedEmail, verificationCode }: Args) => {
    const email = unformattedEmail.trim().toLocaleLowerCase();

    const code = await verificationCodesRepository.getCode({
      email,
    });

    if (!code) throw new Error(errorMessages.USER_HAS_NO_VERIFICATION_CODE);
    if (code !== verificationCode)
      throw new Error(errorMessages.WRONG_VERIFICATION_CODE);

    await verificationCodesRepository.deleteCode({ email });
    const user = await usersRepository.updateUser({ email, isConfirmed: true });

    const userToken = tokenManager.generateToken(user.userId);

    return `Bearer ${userToken}`;
  };
};

export { makeVerifyUser };
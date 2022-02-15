import type {
  WithConfirmationCodesRepository,
  WithTokenManager,
  WithUsersRepository,
} from "../_utils_/dependencies.interfaces";

import { UserNotExist, WrongConfirmationCode } from "./_utils_/Exceptions";

type Dependencies = WithTokenManager &
  WithUsersRepository &
  WithConfirmationCodesRepository;

interface Args {
  authToken: string;
  code: number;
}

const makeConfirmUser = ({
  tokenManager,
  usersRepository,
  confirmationCodesRepository,
}: Dependencies) => {
  return async ({ authToken, code }: Args) => {
    const userId = tokenManager.decode(authToken);

    const user = await usersRepository.getById(userId);
    if (!user) throw new UserNotExist();

    const codeInDb = await confirmationCodesRepository.find(user.email);
    if (codeInDb?.code !== code) throw new WrongConfirmationCode();

    user.isConfirmed = true;
    const updatedUser = await usersRepository.update(user);

    await confirmationCodesRepository.delete(user.email);

    return updatedUser;
  };
};

export { makeConfirmUser };

import type { Args, Dependencies, UserInfo } from "./ConfirmUser.types";

import { UserNotExist } from "../../../utils/Exceptions";
import { WrongConfirmationCode } from "../_utils_/Exceptions";

const makeConfirmUser = ({
  tokenManager,
  usersRepository,
  confirmationCodesRepository,
}: Dependencies) => {
  return async ({ authToken, code }: Args): Promise<UserInfo> => {
    const userId = tokenManager.decode(authToken);

    const user = await usersRepository.getById(userId);
    if (!user) throw new UserNotExist();

    const codeInDb = await confirmationCodesRepository.find(user.email);
    if (codeInDb?.code !== code) throw new WrongConfirmationCode();

    await confirmationCodesRepository.delete(user.email);

    user.confirm();
    const updatedUser = await usersRepository.update(user);

    return {
      userId: updatedUser.userId,
      name: updatedUser.name,
      email: updatedUser.email,
      isConfirmed: updatedUser.isConfirmed,
      createdAt: updatedUser.createdAt,
    };
  };
};

export { makeConfirmUser };

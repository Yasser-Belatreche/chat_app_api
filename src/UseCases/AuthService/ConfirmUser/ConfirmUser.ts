import type { Args, Dependencies } from "./ConfirmUser.types";

import { WrongConfirmationCode } from "../_utils_/Exceptions";
import { UserNotExist } from "../../_utils_/Exceptions";

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

    await confirmationCodesRepository.delete(user.email);

    user.confirm();
    const updatedUser = await usersRepository.update(user);

    return updatedUser.userInfo();
  };
};

export { makeConfirmUser };

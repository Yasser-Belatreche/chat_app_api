import type { Args, Dependencies } from "./ConfirmUser.types";
import type { UserInfo } from "../../_utils_/types";

import { UserNotExist } from "../../../utils/Exceptions";
import { WrongConfirmationCode } from "../_utils_/Exceptions";
import { getUserInfoFromClass } from "../../_utils_/getRegularInfoFromClasses";

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

    return getUserInfoFromClass(updatedUser);
  };
};

export { makeConfirmUser };

import type { UserInfo } from "../../_utils_/types";
import type { Args, Dependencies } from "./SearchForUser.types";

import { UserNotConfirmed } from "../../_utils_/Exceptions";
import { getUsersInfoFromClasses } from "../../_utils_/getRegularInfoFromClasses";

const makeSearchForUser = ({ tokenManager, usersRepository }: Dependencies) => {
  return async ({ authToken, searchKeyword }: Args): Promise<UserInfo[]> => {
    const authUserId = tokenManager.decode(authToken);

    const authUser = await usersRepository.getById(authUserId);
    if (!authUser?.isConfirmed) throw new UserNotConfirmed();

    searchKeyword = searchKeyword.trim().toLowerCase();
    const result = await usersRepository.searchFor(searchKeyword);
    const confirmedUsers = result.filter((user) => user.isConfirmed);

    return getUsersInfoFromClasses(confirmedUsers);
  };
};

export { makeSearchForUser };

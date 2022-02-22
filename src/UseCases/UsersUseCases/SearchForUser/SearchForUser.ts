import type { Args, Dependencies } from "./SearchForUser.types";

import { UserNotConfirmed } from "../../_utils_/Exceptions";

const makeSearchForUser = ({ tokenManager, usersRepository }: Dependencies) => {
  return async ({ authToken, searchKeyword }: Args) => {
    const authUserId = tokenManager.decode(authToken);

    const authUser = await usersRepository.getById(authUserId);
    if (!authUser?.isConfirmed) throw new UserNotConfirmed();

    searchKeyword = searchKeyword.trim().toLowerCase();
    const result = await usersRepository.searchFor(searchKeyword);
    const confirmedUsers = result.filter((user) => user.isConfirmed);

    return confirmedUsers.map((user) => user.userInfo());
  };
};

export { makeSearchForUser };

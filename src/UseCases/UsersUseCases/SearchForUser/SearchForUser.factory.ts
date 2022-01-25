import type {
  WithTokenManager,
  WithUsersRepository,
} from "../../_utils_/types";

type Dependencies = WithTokenManager & WithUsersRepository;

interface Args {
  authToken: string;
  searchKeyword: string;
}

const makeSearchForUser = ({ tokenManager, usersRepository }: Dependencies) => {
  return async ({ authToken, searchKeyword }: Args) => {
    const _ = tokenManager.decode(authToken);
    if (!searchKeyword) return [];

    return await usersRepository.searchForUsers(searchKeyword);
  };
};

export { makeSearchForUser };

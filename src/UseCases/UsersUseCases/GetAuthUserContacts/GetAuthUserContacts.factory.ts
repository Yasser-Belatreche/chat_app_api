import type { WithTokenManager } from "../../_utils_/types";

type Dependencies = WithTokenManager;

interface Args {
  authToken: string;
}

const makeGetAuthUserContacts = ({ tokenManager }: Dependencies) => {
  return async ({ authToken }: Args) => {
    const authUserId = tokenManager.decode(authToken);
  };
};

export { makeGetAuthUserContacts };

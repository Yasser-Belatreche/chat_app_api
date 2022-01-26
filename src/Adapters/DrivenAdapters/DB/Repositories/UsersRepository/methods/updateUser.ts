import type { UserToReturn } from "./_utils_/types";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

interface Args {
  userId: string;
  email: string;
  name: string;
  password: string;
}

const updateUser = () => {
  try {
  } catch (error) {
    throw new Error(`${errorMessages.DB_ERROR} ${error}`);
  }
};

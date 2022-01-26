import type { UserToReturn } from "./_utils_/types";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

const searchForUsers = async (
  searchKeyword: string
): Promise<UserToReturn[]> => {
  try {
    const query = `
      SELECT user_id, name, email FROM users
      WHERE (user_id LIKE %$1% OR email LIKE %$1%) AND is_confirmed = true
    `;
    const values = [searchKeyword];

    const { rows: result } = await DB.query(query, values);

    return result;
  } catch (error) {
    throw new Error(`${errorMessages.DB_ERROR} ${error}`);
  }
};

export { searchForUsers };

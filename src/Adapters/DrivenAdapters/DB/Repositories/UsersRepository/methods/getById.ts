import type { UserToReturn } from "./_utils_/types";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

const getById = async (id: string): Promise<UserToReturn | undefined> => {
  try {
    const query = `
      SELECT user_id, name, email FROM users
      WHERE user_id = $1 AND is_confirmed = true
    `;
    const values = [id];

    const {
      rows: [result],
    } = await DB.query(query, values);

    if (!result) return undefined;

    return {
      userId: result.user_id,
      name: result.name,
      email: result.email,
    };
  } catch (error) {
    throw new Error(`${errorMessages.DB_ERROR} ${error}`);
  }
};

export { getById };

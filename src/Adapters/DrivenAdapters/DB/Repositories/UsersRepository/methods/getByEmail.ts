import type { UserToReturn } from "./_utils_/types";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

const getByEmail = async (email: string): Promise<UserToReturn | undefined> => {
  try {
    const query = `
      SELECT user_id, name, email FROM users
      WHERE email = $1 AND is_confirmed = true
    `;
    const values = [email];

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

export { getByEmail };

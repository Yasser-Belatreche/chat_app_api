import type { UserToReturn } from "./_utils_/types";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

interface Args {
  userId: string;
  name: string;
  email: string;
  password: string;
}
const registerNewUser = async ({
  userId,
  name,
  email,
  password,
}: Args): Promise<UserToReturn> => {
  try {
    const query = `
      INSERT INTO users (user_id, name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, name, email
    `;
    const values = [userId, name, email, password];

    const {
      rows: [result],
    } = await DB.query(query, values);

    return {
      userId: result.user_id,
      name: result.name,
      email: result.email,
    };
  } catch (error) {
    throw new Error(`${errorMessages.DB_ERROR} ${error}`);
  }
};

export { registerNewUser };

import type { UsersRepository } from "../../../../../../Ports/DrivenPorts/DB";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

const registerNewUser: UsersRepository["registerNewUser"] = async ({
  userId,
  name,
  email,
  password,
}) => {
  // try {
  //   const query = `
  //     INSERT INTO users (user_id, name, email, password)
  //     VALUES ($1, $2, $3, $4)
  //     RETURNING user_id, name, email
  //   `;
  //   const values = [userId, name, email, password];

  //   const {
  //     rows: [result],
  //   } = await DB.query(query, values);

  //   return {
  //     userId: result.user_id,
  //     name: result.name,
  //     email: result.email,
  //   };
  // } catch (error) {
  //   throw new Error(`${errorMessages.DB_ERROR} ${error}`);
  // }
  return {
    email: "",
    name: "",
    userId: "",
  };
};

export { registerNewUser };

import type { UsersRepository } from "../../../../../../Ports/DrivenPorts/DB";

import { DB } from "../../../DbConnection";
import { errorMessages } from "../../../../../../utils/ErrorMessages";

const getByEmail: UsersRepository["getByEmail"] = async (email, options) => {
  // try {
  //   const getNonConfirmed = options?.getNonConfirmed;
  //   const withPassword = options?.withPassword;

  //   const query = `
  //     SELECT user_id, name, email, password, is_confirmed FROM users
  //     WHERE email = $1 AND ${!getNonConfirmed && "is_confirmed = true"}
  //   `;
  //   const values = [email];

  //   const {
  //     rows: [result],
  //   } = await DB.query(query, values);

  //   if (!result) return undefined;

  //   return {
  //     userId: result.user_id,
  //     name: result.name,
  //     email: result.email,
  //     ...(getNonConfirmed && { isConfirmed: result.isConfirmed }),
  //     ...(withPassword && { password: result.password }),
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

export { getByEmail };

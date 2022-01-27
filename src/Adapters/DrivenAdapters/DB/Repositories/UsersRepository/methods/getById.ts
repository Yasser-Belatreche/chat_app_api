import { UsersRepository } from "../../../../../../Ports/DrivenPorts/DB";
import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

const getById: UsersRepository["getById"] = async (id, options) => {
  // try {
  //   const getNonConfirmed = options?.getNonConfirmed;
  //   const withPassword = options?.withPassword;

  //   const query = `
  //     SELECT user_id, name, email, password, is_confirmed FROM users
  //     WHERE user_id = $1 AND ${!getNonConfirmed && "is_confirmed = true"}
  //   `;
  //   const values = [id];

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

export { getById };

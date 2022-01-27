import type { UsersRepository } from "../../../../../../Ports/DrivenPorts/DB";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

const searchForUsers: UsersRepository["searchForUsers"] = async (keyword) => {
  // try {
  //   const query = `
  //     SELECT user_id, name, email FROM users
  //     WHERE (user_id LIKE %$1% OR email LIKE %$1%) AND is_confirmed = true
  //   `;
  //   const values = [keyword];

  //   const { rows: result } = await DB.query(query, values);

  //   return formateReturn(result);
  // } catch (error) {
  //   throw new Error(`${errorMessages.DB_ERROR} ${error}`);
  // }
  return [
    {
      email: "",
      name: "",
      userId: "",
    },
  ];
};

// const formateReturn = (array: any[]) => {
//   return array.map((user) => ({
//     userId: user.user_id,
//     name: user.name,
//     email: user.email,
//   }));
// };

export { searchForUsers };

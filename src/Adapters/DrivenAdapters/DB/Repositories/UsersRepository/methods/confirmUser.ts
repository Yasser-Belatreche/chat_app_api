import type { UsersRepository } from "../../../../../../Ports/DrivenPorts/DB";

import { errorMessages } from "../../../../../../utils/ErrorMessages";
import { DB } from "../../../DbConnection";

const confirmUser: UsersRepository["confirmUser"] = async (userId) => {
  // try {
  // } catch (error) {
  //   throw new Error(`${errorMessages.DB_ERROR} ${error}`);
  // }
  return {
    email: "",
    name: "",
    userId: "",
  };
};

export { confirmUser };

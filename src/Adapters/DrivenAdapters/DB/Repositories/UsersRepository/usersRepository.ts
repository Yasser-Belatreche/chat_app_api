import type { UsersRepository } from "../../../../../Ports/DrivenPorts/DB";

import { getByEmail } from "./methods/getByEmail";
import { getById } from "./methods/getById";
import { registerNewUser } from "./methods/registerNewUser";
import { searchForUsers } from "./methods/searchForUsers";
import { confirmUser } from "./methods/confirmUser";

const usersRepository: UsersRepository = {
  getByEmail,
  getById,
  registerNewUser,
  searchForUsers,
  confirmUser,
};

export { usersRepository };

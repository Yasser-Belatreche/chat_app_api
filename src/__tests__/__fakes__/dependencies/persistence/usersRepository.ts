import { IUser } from "../../../../Domain/User/User.Factory";
import type { UsersRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

const repository = new Map();

const usersRepository: UsersRepository = {
  add: async (user) => {
    await repository.set(user.userId, user);
    return repository.get(user.userId);
  },

  getById: async (id) => {
    return await repository.get(id);
  },

  getByEmail: async (email) => {
    return await [...repository.values()].find(
      (value) => value.email === email
    );
  },
};

export { usersRepository };

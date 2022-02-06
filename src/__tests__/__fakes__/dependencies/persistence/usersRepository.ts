import type { UsersRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

const repository = new Map();

const usersRepository: UsersRepository = {
  add: async (user) => {
    repository.set(user.userId, user);
    return repository.get(user.userId);
  },

  getById: async (id) => {
    return repository.get(id);
  },

  getByEmail: async (email) => {
    return [...repository.values()].find((value) => value.email === email);
  },
};

export { usersRepository };

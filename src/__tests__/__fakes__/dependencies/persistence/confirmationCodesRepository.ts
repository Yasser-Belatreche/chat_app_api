import type { ConfirmationCodesRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

const repository = new Map();

const confirmationCodesRepository: ConfirmationCodesRepository = {
  add: async (confirmationCode) => {
    repository.set(confirmationCode.email, confirmationCode);
    return repository.get(confirmationCode.email);
  },
  update: async (confirmationCode) => {
    repository.set(confirmationCode.email, confirmationCode);
    return repository.get(confirmationCode.email);
  },
  find: async (email) => {
    return repository.get(email);
  },
};

export { confirmationCodesRepository };

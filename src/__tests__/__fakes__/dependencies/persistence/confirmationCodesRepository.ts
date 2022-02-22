import type { IConfirmationCodesRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

const repository = new Map();

const confirmationCodesRepository: IConfirmationCodesRepository = {
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
  delete: async (email) => {
    const codeToDelete = repository.get(email);
    repository.delete(email);

    return codeToDelete;
  },
};

export { confirmationCodesRepository };

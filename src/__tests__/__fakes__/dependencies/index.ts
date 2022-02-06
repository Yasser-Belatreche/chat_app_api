import { idGenerator } from "./idGenerator";
import { passwordManager } from "./passwordManager";
import { usersRepository } from "./persistence/usersRepository";
import { tokenManager } from "./tokenMananger";

const getFakeDependencies = () => ({
  idGenerator,
  usersRepository,
  passwordManager,
  tokenManager,
});

export { getFakeDependencies };

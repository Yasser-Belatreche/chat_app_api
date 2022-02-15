import { emailService } from "./emailService";
import { idGenerator } from "./idGenerator";
import { passwordManager } from "./passwordManager";
import { confirmationCodesRepository } from "./persistence/confirmationCodesRepository";
import { messagesRepository } from "./persistence/messagesRepository";
import { usersRepository } from "./persistence/usersRepository";
import { tokenManager } from "./tokenMananger";

const getFakeDependencies = () => ({
  idGenerator,
  usersRepository,
  passwordManager,
  tokenManager,
  confirmationCodesRepository,
  emailService,
  messagesRepository,
});

export { getFakeDependencies };

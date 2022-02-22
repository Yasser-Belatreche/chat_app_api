import { EmailServiceFake } from "./EmailService";
import { IdGeneratorFake } from "./IdGenerator";
import { notificationsManager } from "./NotificationsManager";
import { PasswordManagerFake } from "./PasswordManager";
import { confirmationCodesRepository } from "./persistence/confirmationCodesRepository";
import { messagesRepository } from "./persistence/messagesRepository";
import { usersRepository } from "./persistence/usersRepository";
import { TokenManagerFake } from "./TokenMananger";

const getFakeDependencies = () => ({
  IdGeneratorFake,
  usersRepository,
  PasswordManagerFake,
  TokenManagerFake,
  confirmationCodesRepository,
  EmailServiceFake,
  messagesRepository,
  notificationsManager,
});

export { getFakeDependencies };

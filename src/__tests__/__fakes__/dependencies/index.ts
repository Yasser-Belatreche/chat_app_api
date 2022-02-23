import { EmailServiceFake } from "./EmailService";
import { IdGeneratorFake } from "./IdGenerator";
import { notificationsManager } from "./NotificationsManager";
import { PasswordManagerFake } from "./PasswordManager";
import { ConfirmationCodesGatewayFake } from "./Persistence/ConfirmationCodesGateway";
import { messagesRepository } from "./Persistence/messagesRepository";
import { UsersGatewayFake } from "./Persistence/UsersGateway";
import { TokenManagerFake } from "./TokenMananger";

const getFakeDependencies = () => ({
  IdGeneratorFake,
  usersRepository: new UsersGatewayFake(),
  PasswordManagerFake,
  TokenManagerFake,
  confirmationCodesRepository: new ConfirmationCodesGatewayFake(),
  EmailServiceFake,
  messagesRepository,
  notificationsManager,
});

export { getFakeDependencies };

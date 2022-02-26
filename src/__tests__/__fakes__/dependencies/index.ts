import { EmailServiceFake } from "./EmailServiceFake";
import { IdGeneratorFake } from "./IdGeneratorFake";
import { NotificationsManagerFake } from "./NotificationsManagerFake";
import { PasswordManagerFake } from "./PasswordManagerFake";
import { ConfirmationCodesGatewayFake } from "./Persistence/ConfirmationCodesGatewayFake";
import { MessagesGatewayFake } from "./Persistence/MessagesGatewayFake";
import { UsersGatewayFake } from "./Persistence/UsersGatewayFake";
import { TokenManagerFake } from "./TokenManagerFake";

const getFakeDependencies = () => ({
  idGenerator: new IdGeneratorFake(),
  usersRepository: new UsersGatewayFake(),
  passwordManager: new PasswordManagerFake(),
  tokenManager: new TokenManagerFake(),
  confirmationCodesRepository: new ConfirmationCodesGatewayFake(),
  emailService: new EmailServiceFake(),
  messagesRepository: new MessagesGatewayFake(),
  notificationsManager: new NotificationsManagerFake(),
});

export { getFakeDependencies };

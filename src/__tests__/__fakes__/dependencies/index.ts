import { EmailServiceFake } from "./EmailServiceFake";
import { IdGeneratorFake } from "./IdGeneratorFake";
import { NotificationsManagerFake } from "./NotificationsManagerFake";
import { PasswordManagerFake } from "./PasswordManagerFake";
import { ConfirmationCodesGatewayFake } from "./Persistence/ConfirmationCodesGatewayFake";
import { MessagesGatewayFake } from "./Persistence/MessagesGatewayFake";
import { UsersGatewayFake } from "./Persistence/UsersGatewayFake";
import { TokenManagerFake } from "./TokenManagerFake";

const fakeDependencies = {
  idGenerator: new IdGeneratorFake(),
  usersGateway: new UsersGatewayFake(),
  passwordManager: new PasswordManagerFake(),
  tokenManager: new TokenManagerFake(),
  confirmationCodesGateway: new ConfirmationCodesGatewayFake(),
  emailService: new EmailServiceFake(),
  messagesGateway: new MessagesGatewayFake(),
  notificationsManager: new NotificationsManagerFake(),
};

export { fakeDependencies };

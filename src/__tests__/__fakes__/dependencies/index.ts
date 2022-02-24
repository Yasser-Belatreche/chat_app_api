import { EmailServiceFake } from "./EmailServiceFake";
import { IdGeneratorFake } from "./IdGeneratorFake";
import { notificationsManager } from "./NotificationsManagerFake";
import { PasswordManagerFake } from "./PasswordManagerFake";
import { ConfirmationCodesGatewayFake } from "./Persistence/ConfirmationCodesGatewayFake";
import { MessagesGatewayFake } from "./Persistence/MessagesGatewayFake";
import { UsersGatewayFake } from "./Persistence/UsersGatewayFake";
import { TokenManagerFake } from "./TokenManagerFake";

const getFakeDependencies = () => ({
  IdGeneratorFake,
  usersRepository: new UsersGatewayFake(),
  PasswordManagerFake,
  TokenManagerFake,
  confirmationCodesRepository: new ConfirmationCodesGatewayFake(),
  EmailServiceFake,
  messagesRepository: new MessagesGatewayFake(),
  notificationsManager,
});

export { getFakeDependencies };

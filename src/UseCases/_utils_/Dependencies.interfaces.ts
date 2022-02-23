import type { IEmailService } from "../../Ports/DrivenPorts/EmailService/EmailService.interface";
import type { INotificationsManager } from "../../Ports/DrivenPorts/NotificationsManager/NotificationsManager.interface";
import type { IPasswordManager } from "../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";
import type { ITokenManager } from "../../Ports/DrivenPorts/TokenManager/TokenManager.interface";
import type {
  IConfirmationCodesGateway,
  IMessagesGateway,
  IUsersGateway,
} from "../../Ports/DrivenPorts/Persistence/Persistence.interface";

export interface WithUsersGateway {
  usersGateway: IUsersGateway;
}

export interface WithConfirmationCodesGateway {
  confirmationCodesGateway: IConfirmationCodesGateway;
}

export interface WithMessagesGateway {
  messagesGateway: IMessagesGateway;
}

export interface WithPasswordManager {
  passwordManager: IPasswordManager;
}

export interface WithTokenManager {
  tokenManager: ITokenManager;
}

export interface WithEmailService {
  emailService: IEmailService;
}

export interface WithNotificationsManager {
  notificationsManager: INotificationsManager;
}

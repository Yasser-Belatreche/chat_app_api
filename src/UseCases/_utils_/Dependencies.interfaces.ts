import type { IEmailService } from "../../Ports/DrivenPorts/EmailService/EmailService.interface";
import type { INotificationsManager } from "../../Ports/DrivenPorts/NotificationsManager/NotificationsManager.interface";
import type { IPasswordManager } from "../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";
import type { ITokenManager } from "../../Ports/DrivenPorts/TokenManager/TokenManager.interface";
import type {
  IConfirmationCodesRepository,
  IMessagesRepository,
  IUsersRepository,
} from "../../Ports/DrivenPorts/persistence/persistence.interface";

export interface WithUsersRepository {
  usersRepository: IUsersRepository;
}

export interface WithConfirmationCodesRepository {
  confirmationCodesRepository: IConfirmationCodesRepository;
}

export interface WithMessagesRepository {
  messagesRepository: IMessagesRepository;
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

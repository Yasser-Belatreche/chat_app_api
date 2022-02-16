import type { EmailService } from "../../Ports/DrivenPorts/EmailService/emailService.interface";
import type { NotificationsManager } from "../../Ports/DrivenPorts/NotificationsManager/notificationsManager.interface";
import type { PasswordManager } from "../../Ports/DrivenPorts/PasswordManager/passwordManager.interface";
import type {
  ConfirmationCodesRepository,
  MessagesRepository,
  UsersRepository,
} from "../../Ports/DrivenPorts/persistence/persistence.interface";
import type { TokenManager } from "../../Ports/DrivenPorts/TokenManager/tokenManager.interface";

export interface WithUsersRepository {
  usersRepository: UsersRepository;
}

export interface WithConfirmationCodesRepository {
  confirmationCodesRepository: ConfirmationCodesRepository;
}

export interface WithMessagesRepository {
  messagesRepository: MessagesRepository;
}

export interface WithPasswordManager {
  passwordManager: PasswordManager;
}

export interface WithTokenManager {
  tokenManager: TokenManager;
}

export interface WithEmailService {
  emailService: EmailService;
}

export interface WithNotificationsManager {
  notificationsManager: NotificationsManager;
}

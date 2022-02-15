import { EmailService } from "../../Ports/DrivenPorts/EmailService/emailService.interface";
import { PasswordManager } from "../../Ports/DrivenPorts/PasswordManager/passwordManager.interface";
import {
  ConfirmationCodesRepository,
  MessagesRepository,
  UsersRepository,
} from "../../Ports/DrivenPorts/persistence/persistence.interface";
import { TokenManager } from "../../Ports/DrivenPorts/TokenManager/tokenManager.interface";

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

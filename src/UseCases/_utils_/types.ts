import {
  MessagesRepository,
  UsersRepository,
  VerificationCodesRepository,
} from "../../Ports/DrivenPorts/DB";
import { EmailService } from "../../Ports/DrivenPorts/EmailService";
import { PasswordManager } from "../../Ports/DrivenPorts/PasswordManager";
import { TokenManager } from "../../Ports/DrivenPorts/TokenManager";

export interface WithTokenManager {
  tokenManager: TokenManager;
}

export interface WithPasswordManager {
  passwordManager: PasswordManager;
}

export interface WithUsersRepository {
  usersRepository: UsersRepository;
}

export interface WithMessagesRepository {
  messagesRepository: MessagesRepository;
}

export interface WithVerificationCodesRepository {
  verificationCodesRepository: VerificationCodesRepository;
}

export interface WithEmailService {
  emailService: EmailService;
}

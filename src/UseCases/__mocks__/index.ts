import {
  getMessagesRepository,
  getUsersRepository,
  getVerificationCodesRepository,
} from "./DB";
import { getEmailService } from "./emailService";
import { getPasswordManager } from "./passwordManager";
import { getTokenManager } from "./tokenManger";
import { userInfo, messageInfo } from "./entities";

const getMocks = () => ({
  user: userInfo,
  message: messageInfo,
  passwordManager: getPasswordManager(),
  tokenManager: getTokenManager(),
  emailService: getEmailService(),
  DB: {
    usersRepository: getUsersRepository(),
    verificationCodesRepository: getVerificationCodesRepository(),
    messagesRepository: getMessagesRepository(),
  },
});

export { getMocks };

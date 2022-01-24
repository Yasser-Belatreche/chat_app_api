import { getUserRepository, getVerificationCodeRepository } from "./DB";
import { getEmailService } from "./emailService";
import { getPasswordManager } from "./passwordManager";
import { getToken } from "./token";
import { userInfo } from "./user";

const getMocks = () => ({
  user: userInfo,
  passwordManager: getPasswordManager(),
  token: getToken(),
  emailService: getEmailService(),
  DB: {
    userRepository: getUserRepository(),
    verificationCodeRepository: getVerificationCodeRepository(),
  },
});

export { getMocks };

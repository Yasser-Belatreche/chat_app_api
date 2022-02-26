import {
  confirmationCodesGateway,
  usersGateway,
} from "../DrivenPorts/Persistence/Persistence";
import { passwordManager } from "../DrivenPorts/PasswordManager/PasswordManager";
import { tokenManager } from "../DrivenPorts/TokenManager/TokenManager";
import { emailService } from "../DrivenPorts/EmailService/EmailService";

import { AuthServiceFacade } from "../../UseCases/AuthService/AuthServiceFacade";

const authService = new AuthServiceFacade(
  usersGateway,
  confirmationCodesGateway,
  passwordManager,
  tokenManager,
  emailService
);

export { authService };

import type {
  IConfirmationCodesGateway,
  IUsersGateway,
} from "../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { IEmailService } from "../../Ports/DrivenPorts/EmailService/EmailService.interface";
import type { IPasswordManager } from "../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";
import type { ITokenManager } from "../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import type { LoginArgs } from "./Login/LoginFactory.types";
import type { ConfirmationArgs } from "./ConfirmUser/ConfirmUserFactory.types";
import type { RegisterArgs } from "./RegisterUser/RegsiterUserFactory.types";

import { LoginFactory } from "./Login/LoginFactory";
import { RegisterUserFactory } from "./RegisterUser/RegisterUserFactory";
import { ConfirmUserFactory } from "./ConfirmUser/ConfirmUserFactory";
import { SendConfirmationCodeFactory } from "./SendConfirmationCode/SendConfirmationCodeFactory";

import type { IAuthServiceFacade } from "./AuthServiceFacade.types";

class AuthServiceFacade implements IAuthServiceFacade {
  constructor(
    private readonly usersGateway: IUsersGateway,
    private readonly confirmationCodesGateway: IConfirmationCodesGateway,
    private readonly passwordManager: IPasswordManager,
    private readonly tokenManager: ITokenManager,
    private readonly emailService: IEmailService
  ) {}

  async register(args: RegisterArgs): Promise<string> {
    const registerUserFactory = new RegisterUserFactory(
      this.usersGateway,
      this.passwordManager,
      this.tokenManager
    );

    const token = await registerUserFactory.register(args);
    await this.sendConfirmationCode(args.email);

    return token;
  }

  async login(args: LoginArgs): Promise<string> {
    const loginFactory = new LoginFactory(
      this.usersGateway,
      this.passwordManager,
      this.tokenManager
    );
    return await loginFactory.login(args);
  }

  async sendConfirmationCode(email: string): Promise<number> {
    const sendConfirmationCodeFactory = new SendConfirmationCodeFactory(
      this.usersGateway,
      this.confirmationCodesGateway,
      this.emailService
    );
    return await sendConfirmationCodeFactory.sendCode(email);
  }

  async confirmUser(args: ConfirmationArgs) {
    const confirmUserFactory = new ConfirmUserFactory(
      this.tokenManager,
      this.usersGateway,
      this.confirmationCodesGateway
    );
    return await confirmUserFactory.confirm(args);
  }
}

export { AuthServiceFacade };

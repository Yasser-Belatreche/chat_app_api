import type { IUsersGateway } from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { IPasswordManager } from "../../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";
import type { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import { User } from "../../../Domain/User";

import type { LoginArgs } from "./LoginFactory.types";

class LoginFactory {
  constructor(
    private readonly usersGateway: IUsersGateway,
    private readonly passwordManager: IPasswordManager,
    private readonly tokenManager: ITokenManager
  ) {}

  async login(args: LoginArgs): Promise<string> {
    const userWantToLogin = new User(args);

    const existingUser = await this.getByEmail(userWantToLogin.email);
    if (!existingUser) this.InvalidCredentials();

    const isCorrectPassword = await this.isPasswordMatchHash({
      hash: existingUser.password,
      literal: userWantToLogin.password,
    });
    if (!isCorrectPassword) this.InvalidCredentials();

    const token = this.generateToken(existingUser.userId);
    return token;
  }

  private async getByEmail(email: string) {
    return await this.usersGateway.getByEmail(email);
  }

  private async isPasswordMatchHash(args: {
    hash: string;
    literal: string;
  }): Promise<boolean> {
    return await this.passwordManager.isHashMatchLiteral(args);
  }

  private generateToken(id: string): string {
    return this.tokenManager.generateToken(id);
  }

  private InvalidCredentials(): never {
    throw new Error("Invalid Credentials");
  }
}

export { LoginFactory };

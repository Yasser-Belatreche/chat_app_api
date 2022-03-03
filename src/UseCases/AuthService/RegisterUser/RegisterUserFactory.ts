import type { IUsersGateway } from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { IPasswordManager } from "../../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";
import type { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import { User } from "../../../Domain/User";
import type { IUser } from "../../../Domain/User/User.types";

import type { RegisterArgs } from "./RegsiterUserFactory.types";

class RegisterUserFactory {
  constructor(
    private readonly usersGateway: IUsersGateway,
    private readonly passwordManager: IPasswordManager,
    private readonly tokenManager: ITokenManager
  ) {}

  async register(args: RegisterArgs): Promise<string> {
    const user = new User({ email: args.email, password: args.password });

    const existingUser = await this.getUserByEmail(user.email);
    if (existingUser) this.EmailAlreadyUsedException();

    user.newRegistered(args.name);
    user.password = await this.hashPassword(user.password);

    await this.saveUser(user);

    const token = this.generateToken(user.userId);
    return token;
  }

  private async getUserByEmail(email: string) {
    return await this.usersGateway.getByEmail(email);
  }

  private async hashPassword(password: string): Promise<string> {
    return await this.passwordManager.hash(password);
  }

  private async saveUser(user: IUser) {
    return await this.usersGateway.add(user);
  }

  private generateToken(id: string) {
    return this.tokenManager.generateToken(id);
  }

  private EmailAlreadyUsedException(): never {
    throw new Error("Email already used");
  }
}

export { RegisterUserFactory };

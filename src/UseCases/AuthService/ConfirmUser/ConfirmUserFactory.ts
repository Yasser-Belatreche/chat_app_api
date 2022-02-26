import type { IUser } from "../../../Domain/User/User.types";
import type { IConfirmationCode } from "../../../Domain/ConfirmationCode/ConfirmationCode.types";
import type { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";
import type {
  IConfirmationCodesGateway,
  IUsersGateway,
} from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";

import type { ConfirmationArgs } from "./ConfirmUserFactory.types";

class ConfirmUserFactory {
  constructor(
    private readonly tokenManager: ITokenManager,
    private readonly usersGateway: IUsersGateway,
    private readonly confirmationCodesGateway: IConfirmationCodesGateway
  ) {}

  async confirm({ authToken, code }: ConfirmationArgs) {
    const userId = this.decodeToken(authToken);

    const user = await this.getUserById(userId);
    if (!user) this.UserNotExist();

    const confirmationCode = await this.getCode(user.email);
    if (confirmationCode?.code !== code) this.WrongConfirmationCode();

    await this.deleteCode(user.email);

    user.confirm();
    const updatedUser = await this.updateUser(user);

    return updatedUser.userInfo();
  }

  private decodeToken(token: string) {
    return this.tokenManager.decode(token);
  }

  private async getUserById(id: string): Promise<IUser | undefined> {
    return await this.usersGateway.getById(id);
  }

  private async getCode(email: string): Promise<IConfirmationCode | undefined> {
    return await this.confirmationCodesGateway.find(email);
  }

  private async deleteCode(email: string) {
    return await this.confirmationCodesGateway.delete(email);
  }

  private async updateUser(user: IUser): Promise<IUser> {
    return await this.usersGateway.update(user);
  }

  private UserNotExist(): never {
    throw new Error("User does not exist");
  }

  private WrongConfirmationCode(): never {
    throw new Error("Wrong Confirmation Code");
  }
}

export { ConfirmUserFactory };

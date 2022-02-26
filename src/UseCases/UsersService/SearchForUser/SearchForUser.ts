import type { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";
import type { IUsersGateway } from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";

import { IUser } from "../../../Domain/User/User.types";

import type { SearchArgs } from "./SearchForUser.types";

class SearchForUsersFactory {
  constructor(
    private readonly tokenManager: ITokenManager,
    private readonly usersGateway: IUsersGateway
  ) {}

  async search({ authToken, searchKeyword }: SearchArgs) {
    const authUserId = this.decodeToken(authToken);

    const authUser = await this.getUserById(authUserId);
    if (!authUser?.isConfirmed) this.UserNotConfirmedException();

    searchKeyword = searchKeyword.trim().toLowerCase();
    const result = await this.searchForUsers(searchKeyword);
    const confirmedUsers = this.getConfirmedUsersFrom(result);

    return confirmedUsers.map((user) => user.userInfo());
  }

  private decodeToken(token: string): string {
    return this.tokenManager.decode(token);
  }

  private async getUserById(id: string) {
    return await this.usersGateway.getById(id);
  }

  private async searchForUsers(keyword: string) {
    return await this.usersGateway.searchFor(keyword);
  }

  private getConfirmedUsersFrom(users: IUser[]) {
    return users.filter((user) => user.isConfirmed);
  }

  private UserNotConfirmedException() {
    throw new Error("Cannot perform this action: User not confirmed");
  }
}

export { SearchForUsersFactory };

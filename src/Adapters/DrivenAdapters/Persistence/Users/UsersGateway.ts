import type { IUser } from "../../../../Domain/User/User.types";
import type { IUsersGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { IUserPersistenceFacade, UserInfo } from "./Users.types";

import { User } from "../../../../Domain/User";

class UsersGateway implements IUsersGateway {
  constructor(private readonly userPersistence: IUserPersistenceFacade) {}

  async add(user: IUser): Promise<IUser> {
    const userInfo = await this.userPersistence.add(user.userInfo());

    return this.getUserEntity(userInfo);
  }

  async getById(userId: string): Promise<IUser | undefined> {
    const userInfo = await this.userPersistence.getById(userId);
    if (!userInfo) return undefined;

    return this.getUserEntity(userInfo);
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const userInfo = await this.userPersistence.getByEmail(email);
    if (!userInfo) return undefined;

    return this.getUserEntity(userInfo);
  }

  async update(user: IUser): Promise<IUser> {
    const newUserInfo = await this.userPersistence.update(user);

    return this.getUserEntity(newUserInfo);
  }

  async searchFor(keyword: string): Promise<IUser[]> {
    const usersInfo = await this.userPersistence.searchFor(keyword);

    return usersInfo.map((info) => this.getUserEntity(info));
  }

  private getUserEntity(userInfo: UserInfo): IUser {
    const { email, password } = userInfo;
    const user = new User({ email, password });

    user.userId = userInfo.userId;
    user.name = userInfo.name;
    user.createdAt = userInfo.createdAt;
    user.isConfirmed = userInfo.isConfirmed;

    return user;
  }
}

export { UsersGateway };

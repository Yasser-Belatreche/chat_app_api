import type { IUserPersistenceFacade, UserInfo } from "./Users.types";

class UsersPersistencePostgresFacade implements IUserPersistenceFacade {
  async add(user: UserInfo): Promise<UserInfo> {
    return {};
  }

  async getByEmail(email: string): Promise<UserInfo | undefined> {
    return undefined;
  }

  async getById(id: string): Promise<UserInfo | undefined> {
    return undefined;
  }

  async update(user: UserInfo): Promise<UserInfo> {
    return {};
  }

  async searchFor(keyword: string): Promise<UserInfo[]> {
    return [];
  }
}

export { UsersPersistencePostgresFacade };

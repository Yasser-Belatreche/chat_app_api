import type { IUser } from "../../../../Domain/User/User.types";
import type { IUsersGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";

class UsersGatewayFake implements IUsersGateway {
  private readonly store = new Map<string, IUser>();

  async add(user: IUser): Promise<IUser> {
    this.store.set(user.userId, user);
    return Promise.resolve(user);
  }

  async update(user: IUser): Promise<IUser> {
    this.store.set(user.userId, user);
    return Promise.resolve(user);
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const user = [...this.store.values()].find((value) => {
      return value.email === email;
    });
    return Promise.resolve(user);
  }

  async getById(userId: string): Promise<IUser | undefined> {
    return Promise.resolve(this.store.get(userId));
  }

  async searchFor(keyword: string): Promise<IUser[]> {
    let result: IUser[] = [];
    this.store.forEach((user) => {
      if (user.name.includes(keyword) || user.email.includes(keyword))
        result.push(user);
    });
    return result;
  }

  deleteAll() {
    this.store.clear();
  }
}

export { UsersGatewayFake };

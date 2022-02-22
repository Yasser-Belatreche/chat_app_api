import type { IUser } from "../../../Domain/User/User.Factory";
import type { IUsersRepository } from "../../../Ports/DrivenPorts/persistence/persistence.interface";

class UsersRepository implements IUsersRepository {
  constructor() {}

  getByEmail(email: string): Promise<IUser | undefined> {}

  getById(userId: string): Promise<IUser | undefined> {}

  add(user: IUser): Promise<IUser> {}

  update(user: IUser): Promise<IUser> {}

  searchFor(keyword: string): Promise<IUser[]> {}
}

export { UsersRepository };

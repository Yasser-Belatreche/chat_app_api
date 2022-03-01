import type {
  IMessagesGateway,
  IUsersGateway,
} from "../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { ITokenManager } from "../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import type { SearchArgs } from "./SearchForUsers/SearchForUsers.types";

import { GetContactsListFactory } from "./GetContactsList/GetContactsListFactory";
import { SearchForUsersFactory } from "./SearchForUsers/SearchForUsers";

import type { IUsersServiceFacade } from "./UsersServiveFacade.types";

class UsersServiceFacade implements IUsersServiceFacade {
  constructor(
    private readonly tokenManager: ITokenManager,
    private readonly usersGateway: IUsersGateway,
    private readonly messagesGateway: IMessagesGateway
  ) {}

  async getContacts(authUserId: string) {
    const getContactsListFactory = new GetContactsListFactory(
      this.tokenManager,
      this.usersGateway,
      this.messagesGateway
    );
    return await getContactsListFactory.getList(authUserId);
  }

  async searchForUsers(args: SearchArgs) {
    const searchFactory = new SearchForUsersFactory(
      this.tokenManager,
      this.usersGateway
    );
    return await searchFactory.search(args);
  }
}

export { UsersServiceFacade };

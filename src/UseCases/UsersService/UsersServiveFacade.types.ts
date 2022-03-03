import type { IMessage } from "../../Domain/Message/Message.types";
import type { IUser } from "../../Domain/User/User.types";
import type { SearchArgs } from "./SearchForUsers/SearchForUsers.types";

export interface IUsersServiceFacade {
  searchForUsers(args: SearchArgs): Promise<ReturnType<IUser["userInfo"]>[]>;
  getContacts(authUserId: string): Promise<
    {
      latestMessage: ReturnType<IMessage["messageInfo"]>;
      contact: ReturnType<IUser["userInfo"]> | undefined;
    }[]
  >;
}

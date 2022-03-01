import { UsersServiceFacade } from "../../../../UseCases/UsersService/UsersServiceFacade";

import { fakeDependencies } from "../../../__fakes__/dependencies";

const getUsersServiceWithFakeDepencies = () => {
  const { tokenManager, usersGateway, messagesGateway } = fakeDependencies;

  return new UsersServiceFacade(tokenManager, usersGateway, messagesGateway);
};

export { getUsersServiceWithFakeDepencies };

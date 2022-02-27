import { AuthServiceFacade } from "../../../UseCases/AuthService/AuthServiceFacade";

import { getFakeData } from "../../__fakes__/data";
import { fakeDependencies } from "../../__fakes__/dependencies";

const {
  passwordManager,
  tokenManager,
  usersGateway,
  confirmationCodesGateway,
  emailService,
} = fakeDependencies;
const fakeData = getFakeData();

const authService = new AuthServiceFacade(
  usersGateway,
  confirmationCodesGateway,
  passwordManager,
  tokenManager,
  emailService
);

const getConfirmedUser = async () => {
  const { token, user } = await getNonConfirmedUser();

  const code = await authService.sendConfirmationCode(user.email);
  await authService.confirmUser({ authToken: token, code });

  return { token, user };
};

const getNonConfirmedUser = async () => {
  const { userFakeInfo } = fakeData;
  const email = userFakeInfo.email.toLowerCase();

  const token = await authService.register(userFakeInfo);

  const registredUser = await usersGateway.getByEmail(email);
  if (!registredUser) throw "";

  return { token, user: registredUser.userInfo() };
};

export { getConfirmedUser, getNonConfirmedUser };

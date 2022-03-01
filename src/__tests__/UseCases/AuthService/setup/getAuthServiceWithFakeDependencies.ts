import { AuthServiceFacade } from "../../../../UseCases/AuthService/AuthServiceFacade";
import { fakeDependencies } from "../../../__fakes__/dependencies";

const getAuthServiceWithFakeDependencies = () => {
  const {
    usersGateway,
    confirmationCodesGateway,
    passwordManager,
    tokenManager,
    emailService,
  } = fakeDependencies;

  return new AuthServiceFacade(
    usersGateway,
    confirmationCodesGateway,
    passwordManager,
    tokenManager,
    emailService
  );
};

export { getAuthServiceWithFakeDependencies };

import { expect } from "chai";

import { getFakeData } from "../../__fakes__/data";
import { getFakeDependencies } from "../../__fakes__/dependencies";

import { AuthServiceFacade } from "../../../UseCases/AuthService/AuthServiceFacade";

describe("AuthServiceFacade - Login & Registrations", () => {
  const {
    usersGateway,
    confirmationCodesGateway,
    passwordManager,
    tokenManager,
    emailService,
  } = getFakeDependencies();
  const fakeData = getFakeData();

  const authService = new AuthServiceFacade(
    usersGateway,
    confirmationCodesGateway,
    passwordManager,
    tokenManager,
    emailService
  );

  let userInfo = fakeData.userFakeInfo;

  beforeEach(() => {
    userInfo = fakeData.userFakeInfo;
  });

  it("should hash the password when registration and return a user Token", async () => {
    const userToken = await authService.register(userInfo);

    const registeredUser = await usersGateway.getByEmail(
      userInfo.email.toLowerCase()
    );

    expect(userToken).to.be.a("string").to.include("Bearer ");
    expect(registeredUser?.password)
      .to.be.a("string")
      .and.not.equal(userInfo.password);
  });

  it("new registred users should not be Confirmed", async () => {
    await authService.register(userInfo);

    const registeredUser = await usersGateway.getByEmail(
      userInfo.email.toLowerCase()
    );

    expect(registeredUser?.isConfirmed).to.be.false;
  });

  it("should be able to login after registration", async () => {
    await authService.register(userInfo);
    const userToken = await authService.login(userInfo);
    expect(userToken).to.be.a("string").to.include("Bearer ");
  });

  it("should not be able to login with wrong password, or if the email does not exist", async () => {
    await authService.register(userInfo);

    await expect(
      authService.login({ ...userInfo, password: "someWrongPassword" })
    ).to.be.rejected;

    await expect(
      authService.login({ ...userInfo, email: "doesnNotExist@gmail.com" })
    ).to.be.rejected;
  });

  it("should not have two users with the same email", async () => {
    await authService.register(userInfo);

    await expect(authService.register(userInfo)).to.be.rejected;
    await expect(
      authService.register({ ...userInfo, email: userInfo.email.toUpperCase() })
    ).to.be.rejected;
    await expect(
      authService.register({
        ...userInfo,
        email: ` ${userInfo.email.toLowerCase()}`,
      })
    ).to.be.rejected;
  });

  it("each user should get a unique token after login", async () => {
    const secondUserInfo = fakeData.userFakeInfo;

    await authService.register(userInfo);
    await authService.register(secondUserInfo);

    const firstUserToken = await authService.login({
      email: userInfo.email,
      password: userInfo.password,
    });
    const secondUserToken = await authService.login({
      email: secondUserInfo.email,
      password: secondUserInfo.password,
    });

    expect(firstUserToken).to.not.equal(secondUserToken);
  });
});

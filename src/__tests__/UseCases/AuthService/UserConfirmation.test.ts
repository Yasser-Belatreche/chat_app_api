import Sinon from "sinon";
import { expect } from "chai";

import { getFakeData } from "../../__fakes__/data";
import { getFakeDependencies } from "../../__fakes__/dependencies";

import { AuthServiceFacade } from "../../../UseCases/AuthService/AuthServiceFacade";

describe("AuthServiceFacade - User Confirmation", () => {
  const {
    usersGateway,
    confirmationCodesGateway,
    passwordManager,
    tokenManager,
    emailService,
  } = getFakeDependencies();
  const fakeData = getFakeData();
  const sendEmailSpy = Sinon.spy(emailService, "send");

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
    sendEmailSpy.resetHistory();
  });

  it("should not send a verification code to an email that doesn't exist", async () => {
    await expect(authService.sendConfirmationCode("notExisting@email.com")).to
      .be.rejected;
    expect(sendEmailSpy.calledOnce).to.be.false;
  });

  it("user with unvalid token should not be able to confirm himself", async () => {
    await expect(
      authService.confirmUser({ authToken: "someInvalidToken", code: 1234 })
    ).to.be.rejected;
  });

  it("should not confirm a user with wrong confirmation code", async () => {
    const token = await authService.register(userInfo);

    await expect(authService.confirmUser({ authToken: token, code: 1234 })).to
      .be.rejected;
  });

  it("user should be able to confirm himself using a correct code, and delete that code after that", async () => {
    const email = userInfo.email.toLowerCase();
    const userToken = await authService.register(userInfo);

    const code = await authService.sendConfirmationCode(
      userInfo.email.toLowerCase()
    );

    await authService.confirmUser({ authToken: userToken, code });

    const confirmedUser = await usersGateway.getByEmail(email);

    expect(sendEmailSpy.calledTwice).to.be.true;
    expect(confirmedUser?.isConfirmed).to.be.true;
    expect(confirmedUser?.email).to.equal(email);

    const codeInDb = await confirmationCodesGateway.find(email);
    expect(codeInDb).to.be.undefined;
  });

  it("should be able to generate a new confirmation code if the user doesn't receive the first code", async () => {
    const email = userInfo.email.toLowerCase();

    await authService.register(userInfo);

    const firstCode = await authService.sendConfirmationCode(email);
    const secondCode = await authService.sendConfirmationCode(email);

    expect(firstCode).to.not.equal(secondCode);

    await expect(
      confirmationCodesGateway.find(email)
    ).to.eventually.have.property("code", secondCode);
  });
});

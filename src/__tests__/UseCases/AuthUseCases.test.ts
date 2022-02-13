import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { makeConfirmUser } from "../../UseCases/AuthUseCases/ConfirmUser";

import { makeLogin } from "../../UseCases/AuthUseCases/Login.Factory";
import { makeRegisterUser } from "../../UseCases/AuthUseCases/RegisterUser.Factory";
import { makeSendConfirmationCode } from "../../UseCases/AuthUseCases/SendConfirmationCode";

import { getFakeData } from "../__fakes__/data";
import { getFakeDependencies } from "../__fakes__/dependencies";

chai.use(chaiAsPromised);

const fakeData = getFakeData();
const {
  passwordManager,
  usersRepository,
  tokenManager,
  confirmationCodesRepository,
  emailService,
} = getFakeDependencies();

const registerUser = makeRegisterUser({
  usersRepository,
  passwordManager,
  tokenManager,
});
const login = makeLogin({ usersRepository, passwordManager, tokenManager });
const sendConfirmationCode = makeSendConfirmationCode({
  usersRepository,
  confirmationCodesRepository,
  emailService,
});
const confirmUser = makeConfirmUser({});

describe("AuthUseCase", () => {
  describe("Login & Registration", () => {
    it("should hash the password when registration and return a user Token", async () => {
      const user = fakeData.user;

      const userToken = await registerUser(user);

      const registeredUser = await usersRepository.getByEmail(
        user.email.toLowerCase()
      );

      expect(registeredUser?.password)
        .to.be.a("string")
        .and.not.equal(user.password);
      expect(userToken).to.be.a("string").to.include("Bearer ");
    });

    it("new registred users should have the isConfirmed to be false", async () => {
      const user = fakeData.user;

      await registerUser(user);

      const registeredUser = await usersRepository.getByEmail(
        user.email.toLowerCase()
      );

      expect(registeredUser?.isConfirmed).to.be.false;
    });

    it("should be able to login after registration", async () => {
      const user = fakeData.user;

      await registerUser(user);
      const userToken = await login({
        email: user.email,
        password: user.password,
      });
      expect(userToken).to.be.a("string").to.include("Bearer ");
    });

    it("should not be able to login with wrong password, or if the email does not exist", async () => {
      const user = fakeData.user;

      await registerUser(user);

      await expect(
        login({
          email: user.email.toLowerCase(),
          password: "someWrongPassword",
        })
      ).to.be.rejected;

      await expect(
        login({ email: "doesnNotExist@gmail.com", password: user.password })
      ).to.be.rejected;
    });

    it("should not have two users with the same email", async () => {
      const user = fakeData.user;

      await registerUser(user);

      await expect(registerUser(user)).to.be.rejected;
      await expect(registerUser({ ...user, email: user.email.toUpperCase() }))
        .to.be.rejected;
      await expect(
        registerUser({ ...user, email: ` ${user.email.toLowerCase()}` })
      ).to.be.rejected;
    });

    it("each user should have a unique token after login", async () => {
      const firstUser = fakeData.user;
      const secondUser = fakeData.user;

      await registerUser(firstUser);
      await registerUser(secondUser);

      const firstUserToken = await login({
        email: firstUser.email,
        password: firstUser.password,
      });
      const secondUserToken = await login({
        email: secondUser.email,
        password: secondUser.password,
      });

      expect(firstUserToken).to.not.equal(secondUserToken);
    });
  });

  describe("User Confirmation", () => {
    const user = fakeData.user;

    it("should not send a verification code to an email that doesn't exist", async () => {
      await expect(sendConfirmationCode({ email: "noExisting@email.com" })).to
        .be.rejected;
    });

    // it("user should be able to confirm himself using a correct code", async () => {
    //   const userToken = await registerUser(fakeData.user);

    //   const code = await sendConfirmationCode({
    //     email: user.email,
    //   });

    //   const confirmedUser = await confirmUser({ authToken: userToken, code });

    //   expect(confirmedUser.isConfirmed).to.be.true;
    // });
  });
});

/**
 * 2 - should be able to confirm a user
 */

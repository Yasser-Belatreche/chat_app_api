import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { makeLogin } from "../../UseCases/AuthUseCases/Login/Login";
import { makeRegisterUser } from "../../UseCases/AuthUseCases/RegisterUser/RegisterUser";
import { makeSendConfirmationCode } from "../../UseCases/AuthUseCases/SendConfirmationCode/SendConfirmationCode";
import { makeConfirmUser } from "../../UseCases/AuthUseCases/ConfirmUser/ConfirmUser";

import { getFakeData } from "../__fakes__/data";
import { getFakeDependencies } from "../__fakes__/dependencies";
import Sinon from "sinon";

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
const confirmUser = makeConfirmUser({
  tokenManager,
  usersRepository,
  confirmationCodesRepository,
});

describe("AuthUseCases", () => {
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

    it("each user should get a unique token after login", async () => {
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
    const sendEmailSpy = Sinon.spy(emailService, "send");

    it("should not send a verification code to an email that doesn't exist", async () => {
      await expect(sendConfirmationCode({ email: "notExisting@email.com" })).to
        .be.rejected;
      expect(sendEmailSpy.calledOnce).to.be.false;
    });

    it("user with unvalid token should not be able to confirm himself", async () => {
      await expect(confirmUser({ authToken: "someInvalidToken", code: 1234 }))
        .to.be.rejected;
    });

    it("should not confirm a user with wrong confirmation code", async () => {
      const token = await registerUser(fakeData.user);

      await expect(confirmUser({ authToken: token, code: 1234 })).to.be
        .rejected;
    });

    it("user should be able to confirm himself using a correct code, and delete that code after that", async () => {
      const { user } = fakeData;

      const userToken = await registerUser(user);

      const code = await sendConfirmationCode({
        email: user.email.toLowerCase(),
      });

      await confirmUser({ authToken: userToken, code });

      const confirmedUser = await usersRepository.getByEmail(
        user.email.toLowerCase()
      );

      expect(sendEmailSpy.calledOnce).to.be.true;
      expect(confirmedUser?.isConfirmed).to.be.true;
      expect(confirmedUser?.email).to.equal(user.email.toLowerCase());

      const codeInDb = await confirmationCodesRepository.find(
        user.email.toLowerCase()
      );
      expect(codeInDb).to.be.undefined;
    });

    it("should be able to generate a new confirmation code if the user doesn't receive the first code", async () => {
      const { user } = fakeData;
      const email = user.email.toLowerCase();

      await registerUser(user);

      const firstCode = await sendConfirmationCode({ email });
      const secondCode = await sendConfirmationCode({ email });

      expect(firstCode).to.not.equal(secondCode);

      await expect(
        confirmationCodesRepository.find(email)
      ).to.eventually.have.property("code", secondCode);
    });
  });
});

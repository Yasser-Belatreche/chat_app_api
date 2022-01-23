import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { makeLogin } from "./Login.factory";

chai.use(chaiAsPromised);
/**
 * 3 - return a token when everything is OK
 */

describe("Login use case", () => {
  const realUser = {
    userId: "myUserId",
    name: "someName",
    email: "email@gmail.com",
    password: "hashedPassword",
  };
  const userRepository: any = {
    getByEmail: (e: string) => Promise.resolve(realUser),
  };
  const passwordManager: any = {
    compareHashWithLiteral: (args: any) => true,
  };
  const Token: any = {
    generateToken: (id: string) => `Bearer mySuperSecretToken`,
  };

  const login = makeLogin({ userRepository, passwordManager, Token });

  it("should not be able to login with invalid inputs", async () => {
    const userInfoWithUnvalidEmail = {
      email: "eam",
      password: "secretPassword",
    };
    const userInfoWithUnvalidPassword = {
      email: "email@email.com",
      password: "secret",
    };

    await expect(login(userInfoWithUnvalidEmail)).to.be.rejectedWith(
      "unvalid email"
    );
    await expect(login(userInfoWithUnvalidPassword)).to.be.rejectedWith(
      "should have more than 8 characters"
    );
  });

  it("should not be able to login when the user does not exist", async () => {
    userRepository.getByEmail = (e: string) => Promise.resolve(undefined);

    await expect(
      login({ email: "email@noExist.com", password: "wrongPassword" })
    ).to.be.rejectedWith("no user associated with this email");
  });

  it("should not be able to login when the password does not match the email", async () => {
    userRepository.getByEmail = (e: string) => Promise.resolve(realUser);
    passwordManager.compareHashWithLiteral = (args: any) => false;

    await expect(
      login({ email: realUser.email, password: "wrongPassword" })
    ).to.be.rejectedWith("wrong credentials");
  });

  it("should return a user token when the password match the email", async () => {
    passwordManager.compareHashWithLiteral = (args: any) => true;

    await expect(
      login({ email: realUser.email, password: "wrongPassword" })
    ).to.eventually.include("Bearer ");
  });
});

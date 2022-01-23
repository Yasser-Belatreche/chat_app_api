import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";
import Sinon from "sinon";

import { makeSignup } from "./Signup.factory";

chai.use(chaiAsPromised);

/**
 * 3 - when everything hash his password sign him up temporarly with unconfirmed status and return the confirmation code
 */

describe("Signup use case", () => {
  const realUser = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(9),
  };
  const userRepository: any = {
    getByEmail: async (e: string) =>
      Promise.resolve({ ...realUser, userId: faker.datatype.uuid() }),
    registerNewUser: Sinon.spy(),
  };
  const passwordManager = {
    generateHash: Sinon.spy((pass: string) => "someHash"),
  };

  const signup = makeSignup({ userRepository, passwordManager });

  it("should not be able to signup with invalid values", async () => {
    const valuesWithUnvalidName = {
      ...realUser,
      name: "hel",
    };
    const valuesWithUnvalidEmail = {
      ...realUser,
      email: "helloword.com",
    };
    const valuesWithUnvalidPassword = {
      ...realUser,
      password: faker.datatype.string(3),
    };

    await expect(signup(valuesWithUnvalidName)).to.be.rejectedWith(
      "name should have more than 4 characters"
    );
    await expect(signup(valuesWithUnvalidEmail)).to.be.rejectedWith(
      "unvalid email"
    );
    await expect(signup(valuesWithUnvalidPassword)).to.be.rejectedWith(
      "password should have more than 8 characters"
    );
  });

  it("should not be able to signup with a used email", async () => {
    const userWithUsedEmail = {
      ...realUser,
      email: "someUsedEmail@gmail.com",
    };

    await expect(signup(userWithUsedEmail)).to.be.rejectedWith(
      "email already used"
    );
  });

  it("should hash the password and sign the user temporarly with unconfirmed status", async () => {
    userRepository.getByEmail = (e: string) => Promise.resolve(undefined);

    await signup(realUser);

    expect(passwordManager.generateHash.calledOnce).to.be.true;
    expect(passwordManager.generateHash.calledWith(realUser.password)).to.be
      .true;

    expect(userRepository.registerNewUser.calledOnce).to.be.true;

    expect(userRepository.registerNewUser.getCalls()[0].args[0]).to.include({
      name: realUser.name.toLowerCase(),
      email: realUser.email.toLowerCase(),
      password: "someHash",
      isConfirmed: false,
    });
  });

  it("should return a random confirmation code", async () => {
    const firstCode = await signup(realUser);
    const secondCode = await signup(realUser);

    expect(firstCode).to.not.equal(secondCode);
    expect(firstCode)
      .to.be.greaterThanOrEqual(1000)
      .and.to.be.lessThanOrEqual(9999);
    expect(secondCode)
      .to.be.greaterThanOrEqual(1000)
      .and.to.be.lessThanOrEqual(9999);
  });
});

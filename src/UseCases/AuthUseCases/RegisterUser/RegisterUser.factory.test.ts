import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import faker from "faker";
import Sinon from "sinon";

import { getMocks } from "../../__mocks__";

import { makeRegisterUser } from "./RegisterUser.factory";

chai.use(chaiAsPromised);

describe("RegisterUser use case", () => {
  const {
    DB: { usersRepository },
    passwordManager,
    user: realUser,
  } = getMocks();

  const HASH = faker.internet.password(20);
  const registerNewUserReturn = {
    userId: faker.datatype.uuid(),
    name: realUser.name.toLowerCase(),
    email: realUser.email.toLowerCase(),
    password: HASH,
    isConfirmed: false,
  };

  const registerUser = makeRegisterUser({ usersRepository, passwordManager });

  it("should not be able to register with invalid values", async () => {
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

    await expect(registerUser(valuesWithUnvalidName)).to.be.rejectedWith(
      "name should have more than 4 characters"
    );
    await expect(registerUser(valuesWithUnvalidEmail)).to.be.rejectedWith(
      "unvalid email"
    );
    await expect(registerUser(valuesWithUnvalidPassword)).to.be.rejectedWith(
      "password should have more than 8 characters"
    );
  });

  it("should not be able to register with a used email", async () => {
    const userWithUsedEmail = {
      ...realUser,
      email: "someUsedEmail@gmail.com",
    };

    await expect(registerUser(userWithUsedEmail)).to.be.rejectedWith(
      "email already used"
    );
  });

  it("should hash the password and register the user temporarly with unconfirmed status, and return the new user", async () => {
    usersRepository.getByEmail = (e: string) => Promise.resolve(undefined);
    usersRepository.registerNewUser = Sinon.spy(() =>
      Promise.resolve(registerNewUserReturn)
    );

    const returnValue = await registerUser(realUser);

    expect(passwordManager.generateHash.calledOnce).to.be.true;
    expect(passwordManager.generateHash.calledWith(realUser.password)).to.be
      .true;

    expect(usersRepository.registerNewUser.calledOnce).to.be.true;

    expect(returnValue).to.equal(registerNewUserReturn);
  });
});

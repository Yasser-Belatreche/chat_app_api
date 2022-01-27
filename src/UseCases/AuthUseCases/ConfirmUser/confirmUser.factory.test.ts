/**
 * 3 - if the user exist and the code, update the isConfirmed status of that user and return a user token and remove the verificationCode from DB
 */

import { expect } from "chai";
import Sinon from "sinon";
import faker from "faker";

import { getMocks } from "../../__mocks__";

import { makeVerifyUser } from "./confirmUser.factory";

describe("ConfirmUser use case", () => {
  const {
    DB: { usersRepository, verificationCodesRepository },
    tokenManager,
    user,
  } = getMocks();

  const correctCode = 1234;

  const verifyUser = makeVerifyUser({
    usersRepository,
    verificationCodesRepository,
    tokenManager,
  });

  it("should not verify a non exsiting user", async () => {
    verificationCodesRepository.getCode = Sinon.spy(() =>
      Promise.resolve(undefined)
    );

    const verificationArgs = { email: user.email, verificationCode: 1234 };

    await expect(verifyUser(verificationArgs)).to.be.rejectedWith(
      "no verification code for this user"
    );
  });

  it("should not verify the user if the verification code is wrong", async () => {
    verificationCodesRepository.getCode = Sinon.spy(() =>
      Promise.resolve(correctCode)
    );

    const verificationArgs = { email: user.email, verificationCode: 1243 };

    await expect(verifyUser(verificationArgs)).to.be.rejectedWith(
      "wrong verification code"
    );
  });

  it("when the code is correct, confirme the user and remove the old verification code, and return the user token", async () => {
    const userToken = faker.datatype.string(20);
    tokenManager.generateToken = Sinon.spy(() => `Bearer ${userToken}`);

    const verificationArgs = {
      email: user.email,
      verificationCode: correctCode,
    };

    await expect(verifyUser(verificationArgs)).to.eventually.equal(
      `Bearer ${userToken}`
    );

    expect(verificationCodesRepository.deleteCode.calledOnce).to.be.true;
    expect(usersRepository.confirmUser.calledOnce).to.be.true;
  });
});

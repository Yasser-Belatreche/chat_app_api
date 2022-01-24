/**
 * 3 - if the user exist and the code, update the isConfirmed status of that user and return a user token and remove the verificationCode from DB
 */

import { expect } from "chai";
import Sinon from "sinon";
import faker from "faker";

import { getMocks } from "../../__mocks__";

import { makeVerifyUser } from "./verifyUser.factory";

describe("VerifyUser use case", () => {
  const {
    DB: { userRepository, verificationCodeRepository },
    token,
    user,
  } = getMocks();

  const correctCode = 1234;

  const verifyUser = makeVerifyUser({
    userRepository,
    verificationCodeRepository,
    token,
  });

  it("should not verify a non exsiting user", async () => {
    verificationCodeRepository.getCode = Sinon.spy(() =>
      Promise.resolve(undefined)
    );

    const verificationArgs = { email: user.email, verificationCode: 1234 };

    await expect(verifyUser(verificationArgs)).to.be.rejectedWith(
      "no confirmation code for this user"
    );
  });

  it("should not verify the user if the verification code is wrong", async () => {
    verificationCodeRepository.getCode = Sinon.spy(() =>
      Promise.resolve(correctCode)
    );

    const verificationArgs = { email: user.email, verificationCode: 1243 };

    await expect(verifyUser(verificationArgs)).to.be.rejectedWith(
      "wrong verification code"
    );
  });

  it("when the code is correct, confirme the user and remove the old verification code, and return the user token", async () => {
    const userToken = faker.datatype.string(20);
    token.generateToken = Sinon.spy(() => userToken);

    const verificationArgs = {
      email: user.email,
      verificationCode: correctCode,
    };

    await expect(verifyUser(verificationArgs)).to.eventually.equal(
      `Bearer ${userToken}`
    );

    expect(verificationCodeRepository.deleteCode.calledOnce).to.be.true;
    expect(
      verificationCodeRepository.deleteCode.getCalls()[0].args[0]
    ).to.include({ email: verificationArgs.email.toLocaleLowerCase() });

    expect(userRepository.updateUser.calledOnce).to.be.true;
    expect(userRepository.updateUser.getCalls()[0].args[0]).to.include({
      email: verificationArgs.email.toLocaleLowerCase(),
      isConfirmed: true,
    });
  });
});

import { expect } from "chai";
import Sinon from "sinon";

import { getMocks } from "../../__mocks__";

import { makeRegisterVerificationCode } from "./RegisterVerificationCode.factory";

describe("RegisterVerificationCode use case", () => {
  const {
    DB: { userRepository, verificationCodeRepository },
    user,
  } = getMocks();

  const registerVerificationCode = makeRegisterVerificationCode({
    userRepository,
    verificationCodeRepository,
  });

  it("should not register a verification code from an email does not exist", async () => {
    userRepository.getByEmail = async (e: string) => Promise.resolve(undefined);

    const fakeEmail = "fake@email.com";
    await expect(
      registerVerificationCode({ email: fakeEmail })
    ).to.be.rejectedWith("user does not exist");
  });

  it("should save the code in the DB and return it", async () => {
    userRepository.getByEmail = Sinon.spy(() => Promise.resolve(user));

    const verificationCode = await registerVerificationCode({
      email: user.email,
    });

    expect(verificationCodeRepository.addCode.calledOnce).to.be.true;

    expect(verificationCode)
      .to.be.greaterThanOrEqual(1000)
      .and.lessThanOrEqual(9999);
  });

  it("should generate a random code each time", async () => {
    const firstCode = await registerVerificationCode({ email: user.email });
    const secondCode = await registerVerificationCode({ email: user.email });
    const thirdCode = await registerVerificationCode({ email: user.email });

    expect(firstCode).to.not.equal(secondCode).and.not.equal(thirdCode);
  });
});

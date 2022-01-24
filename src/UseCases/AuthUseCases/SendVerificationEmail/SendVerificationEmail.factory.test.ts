import { expect } from "chai";

import { getMocks } from "../../__mocks__";

import { makeSendVerificationEmail } from "./SendVerificationEmail.factory";

describe("SendVerificationEmail use case", () => {
  const { emailService, user } = getMocks();

  const sendVerificationEmail = makeSendVerificationEmail({ emailService });

  it("should send an email contain the verification code passed as argument", async () => {
    const verificationArgs = { email: user.email, verificationCode: 1234 };

    await expect(sendVerificationEmail(verificationArgs)).to.eventually.equal(
      undefined
    );

    expect(emailService.send.calledOnce).to.be.true;

    const emailSendingArgs = emailService.send.getCalls()[0].args[0];
    expect(emailSendingArgs).to.have.property("email", verificationArgs.email);
    expect(emailSendingArgs)
      .to.have.property("HTMLTemplate")
      .to.include(verificationArgs.verificationCode);
  });
});

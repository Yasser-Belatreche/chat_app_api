import { expect } from "chai";

import { makeConfirmationCode } from "../../Domain/ConfirmationCode/ConfirmationCodeFactory";

import { getFakeData } from "../__fakes__/data";

describe("ConfirmationCode entity", () => {
  const ConfirmationCode = makeConfirmationCode();
  const { userFakeInfo, confirmationCodeFakeInfo } = getFakeData();

  it("should not be able to get properties that are not set yet", () => {
    const confirmationCode = new ConfirmationCode(userFakeInfo.email);

    expect(confirmationCode.email).to.equal(userFakeInfo.email);
    expect(() => confirmationCode.code).to.throw();
    expect(() => confirmationCode.createdAt).to.throw();
  });

  it("should not be able to change the properties that are already set", () => {
    const confirmationCode = new ConfirmationCode(userFakeInfo.email);
    confirmationCode.code = 234;
    confirmationCode.createdAt = new Date().toJSON();

    expect(() => (confirmationCode.code = 234)).to.throw();
    expect(() => (confirmationCode.createdAt = new Date().toJSON())).to.throw();
  });

  it("should not have a code with a non valid creation date", () => {
    const confirmationCode = new ConfirmationCode(userFakeInfo.email);

    expect(() => (confirmationCode.createdAt = "haha")).to.throw();
  });

  it("should generate a random 4 degit Code for each email, and attach a createdAt value when calling newCode()", async () => {
    const confirmationCode1 = new ConfirmationCode(userFakeInfo.email);
    const confirmationCode2 = new ConfirmationCode(userFakeInfo.email);
    confirmationCode1.newCode();
    confirmationCode2.newCode();

    expect(confirmationCode1.code).to.not.equal(confirmationCode2.code);
    expect(confirmationCode1.createdAt).to.be.string;
    expect(confirmationCode1.code)
      .to.be.greaterThanOrEqual(1000)
      .and.lessThanOrEqual(9999);
  });

  it("should be able to retreive the code information", () => {
    const codeInfo = confirmationCodeFakeInfo;

    const confirmationCode = new ConfirmationCode(codeInfo.email);
    confirmationCode.code = codeInfo.code;
    confirmationCode.createdAt = codeInfo.createdAt;

    expect(confirmationCode.codeInfo()).to.deep.equal(codeInfo);
  });
});

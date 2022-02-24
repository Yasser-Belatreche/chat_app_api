import { expect } from "chai";

import { makeConfirmationCode } from "../../Domain/ConfirmationCode/ConfirmationCodeFactory";

import { getFakeData } from "../__fakes__/data";

const ConfirmationCode = makeConfirmationCode();

describe("ConfirmationCode entity", () => {
  const { userFakeInfo } = getFakeData();

  it("should generate a random 4 degit Code for each email, and attach a createdAt value", async () => {
    const ConfirmationCode1 = new ConfirmationCode(userFakeInfo.email);
    const ConfirmationCode2 = new ConfirmationCode(userFakeInfo.email);
    const ConfirmationCode3 = new ConfirmationCode(userFakeInfo.email);
    const ConfirmationCode4 = new ConfirmationCode(userFakeInfo.email);

    expect(ConfirmationCode1.code)
      .to.not.equal(ConfirmationCode2.code)
      .to.not.equal(ConfirmationCode3.code)
      .to.not.equal(ConfirmationCode4.code);

    expect(ConfirmationCode1.code)
      .to.be.greaterThanOrEqual(1000)
      .and.lessThanOrEqual(9999);

    expect(ConfirmationCode1.createdAt).to.be.string;
    expect(new Date(ConfirmationCode1.createdAt)).to.be.instanceOf(Date);
    expect(ConfirmationCode1.email).to.equal(userFakeInfo.email);
  });
});

import { expect } from "chai";

import { makeConfirmationCode } from "../../Domain/ConfirmationCode/ConfirmationCode.Factory";

import { getFakeData } from "../__fakes__/data";

const ConfirmationCode = makeConfirmationCode();

describe("ConfirmationCode entity", () => {
  it("should generate a random 4 degit Code for each email, and attach a createdAt value", async () => {
    const user = getFakeData().user;

    const ConfirmationCode1 = new ConfirmationCode(user.email);
    const ConfirmationCode2 = new ConfirmationCode(user.email);
    const ConfirmationCode3 = new ConfirmationCode(user.email);
    const ConfirmationCode4 = new ConfirmationCode(user.email);

    expect(ConfirmationCode1.code)
      .to.not.equal(ConfirmationCode2.code)
      .to.not.equal(ConfirmationCode3.code)
      .to.not.equal(ConfirmationCode4.code);

    expect(ConfirmationCode1.code)
      .to.be.greaterThanOrEqual(1000)
      .and.lessThanOrEqual(9999);

    expect(ConfirmationCode1.createdAt).to.be.string;
    expect(new Date(ConfirmationCode1.createdAt)).to.be.instanceOf(Date);
    expect(ConfirmationCode1.email).to.equal(user.email);
  });
});

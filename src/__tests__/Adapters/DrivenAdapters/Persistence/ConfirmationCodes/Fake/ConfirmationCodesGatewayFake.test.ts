import { expect } from "chai";

import type { IConfirmationCode } from "../../../../../../Domain/ConfirmationCode/ConfirmationCode.types";
import { ConfirmationCode } from "../../../../../../Domain/ConfirmationCode";

import { getFakeData } from "../../../../../__fakes__/data";
import { ConfirmationCodesGatewayFake } from "../../../../../__fakes__/dependencies/Persistence/ConfirmationCodesGatewayFake";

describe("ConfirmationCodesGatewayFake", () => {
  const confirmationCodesGateway = new ConfirmationCodesGatewayFake();
  const fakeData = getFakeData();

  let confirmationCode: IConfirmationCode;

  beforeEach(() => {
    confirmationCode = new ConfirmationCode(fakeData.userFakeInfo.email);
  });

  afterEach(() => {
    confirmationCodesGateway.deleteAll();
  });

  it("should save a confirmationCode", async () => {
    await confirmationCodesGateway.add(confirmationCode);
    await expect(
      confirmationCodesGateway.find(confirmationCode.email)
    ).to.eventually.equal(confirmationCode);
  });

  it("should update a confirmationCode", async () => {
    await confirmationCodesGateway.add(confirmationCode);

    const updatedCode = new ConfirmationCode(confirmationCode.email);
    await confirmationCodesGateway.update(updatedCode);

    await expect(
      confirmationCodesGateway.find(confirmationCode.email)
    ).to.eventually.equal(updatedCode);
  });

  it("should be able to delete a confirmationCode, and return it", async () => {
    await confirmationCodesGateway.add(confirmationCode);

    await expect(
      confirmationCodesGateway.delete(confirmationCode.email)
    ).to.eventually.have.property("email", confirmationCode.email);

    await expect(confirmationCodesGateway.find(confirmationCode.email)).to
      .eventually.be.undefined;
  });
});

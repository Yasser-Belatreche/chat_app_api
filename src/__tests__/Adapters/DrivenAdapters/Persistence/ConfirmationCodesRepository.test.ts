import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { ConfirmationCode } from "../../../../Domain/ConfirmationCode/ConfirmationCode";
import type { IConfirmationCodesGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";

import { getFakeData } from "../../../__fakes__/data";
import { confirmationCodesGateway as fakeConfirmationCodesGateway } from "../../../__fakes__/dependencies/Persistence/ConfirmationCodesGateway";

chai.use(chaiAsPromised);

const fakeData = getFakeData();

const handler = (confirmationCodesGateway: IConfirmationCodesGateway) => {
  return () => {
    it("should save a confirmationCode", async () => {
      const { user } = fakeData;

      const confirmationCode = new ConfirmationCode(user.email);

      await confirmationCodesGateway.add(confirmationCode);
      await expect(
        confirmationCodesGateway.find(confirmationCode.email)
      ).to.eventually.equal(confirmationCode);
    });

    it("should update a confirmationCode", async () => {
      const { user } = fakeData;

      const confirmationCode = new ConfirmationCode(user.email);
      await confirmationCodesGateway.add(confirmationCode);

      const updatedCode = new ConfirmationCode(user.email);
      await confirmationCodesGateway.update(updatedCode);

      await expect(
        confirmationCodesGateway.find(confirmationCode.email)
      ).to.eventually.equal(updatedCode);
    });

    it("should be able to delete a confirmationCode, and return it", async () => {
      const { user } = fakeData;

      const confirmationCode = new ConfirmationCode(user.email);
      await confirmationCodesGateway.add(confirmationCode);

      await expect(
        confirmationCodesGateway.delete(confirmationCode.email)
      ).to.eventually.have.property("email", confirmationCode.email);

      await expect(confirmationCodesGateway.find(confirmationCode.email)).to
        .eventually.be.undefined;
    });
  };
};

describe("ConfirmationCodesGateway", () => {
  describe("Fake", handler(fakeConfirmationCodesGateway));
});

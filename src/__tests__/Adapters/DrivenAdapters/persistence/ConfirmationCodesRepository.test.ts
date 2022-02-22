import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { ConfirmationCode } from "../../../../Domain/ConfirmationCode/ConfirmationCode";
import type { IConfirmationCodesRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

import { getFakeData } from "../../../__fakes__/data";
import { confirmationCodesRepository as fakeConfirmationCodesRepository } from "../../../__fakes__/dependencies/persistence/confirmationCodesRepository";

chai.use(chaiAsPromised);

const fakeData = getFakeData();

const handler = (confirmationCodesRepository: IConfirmationCodesRepository) => {
  return () => {
    it("should save a confirmationCode", async () => {
      const { user } = fakeData;

      const confirmationCode = new ConfirmationCode(user.email);

      await confirmationCodesRepository.add(confirmationCode);
      await expect(
        confirmationCodesRepository.find(confirmationCode.email)
      ).to.eventually.equal(confirmationCode);
    });

    it("should update a confirmationCode", async () => {
      const { user } = fakeData;

      const confirmationCode = new ConfirmationCode(user.email);
      await confirmationCodesRepository.add(confirmationCode);

      const updatedCode = new ConfirmationCode(user.email);
      await confirmationCodesRepository.update(updatedCode);

      await expect(
        confirmationCodesRepository.find(confirmationCode.email)
      ).to.eventually.equal(updatedCode);
    });

    it("should be able to delete a confirmationCode, and return it", async () => {
      const { user } = fakeData;

      const confirmationCode = new ConfirmationCode(user.email);
      await confirmationCodesRepository.add(confirmationCode);

      await expect(
        confirmationCodesRepository.delete(confirmationCode.email)
      ).to.eventually.have.property("email", confirmationCode.email);

      await expect(confirmationCodesRepository.find(confirmationCode.email)).to
        .eventually.be.undefined;
    });
  };
};

describe("ConfirmationCodesRepository", () => {
  describe("Fake", handler(fakeConfirmationCodesRepository));
});

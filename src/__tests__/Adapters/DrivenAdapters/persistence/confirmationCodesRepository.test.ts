import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { ConfirmationCode } from "../../../../Domain/ConfirmationCode/ConfirmationCode";

import { getFakeData } from "../../../__fakes__/data";
import { confirmationCodesRepository as fakeConfirmationCodesRepository } from "../../../__fakes__/dependencies/persistence/confirmationCodesRepository";

chai.use(chaiAsPromised);

const handler =
  (confirmationCodesRepository: typeof fakeConfirmationCodesRepository) =>
  () => {
    const user = getFakeData().user;

    it("should save a confirmationCode", async () => {
      const confirmationCode = new ConfirmationCode(user.email);

      await confirmationCodesRepository.add(confirmationCode);
      await expect(
        confirmationCodesRepository.find(confirmationCode.email)
      ).to.eventually.equal(confirmationCode);
    });

    it("should update a confirmationCode", async () => {
      const confirmationCode = new ConfirmationCode(user.email);
      await confirmationCodesRepository.add(confirmationCode);

      const updatedCode = new ConfirmationCode(user.email);
      await confirmationCodesRepository.update(updatedCode);

      await expect(
        confirmationCodesRepository.find(confirmationCode.email)
      ).to.eventually.equal(updatedCode);
    });
  };

describe("confirmationCodesRepository", () => {
  describe("Fake", handler(fakeConfirmationCodesRepository));
});

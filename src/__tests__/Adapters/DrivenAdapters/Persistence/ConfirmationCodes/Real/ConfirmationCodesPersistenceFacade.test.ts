import { expect } from "chai";

import { ConfirmationCodesPersistencePostgresFacade } from "../../../../../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodesPersistenceFacade";

import { UsersPersistencePostgresFacade } from "../../../../../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";
import { getFakeData } from "../../../../../__fakes__/data";

describe("ConfirmationCodesPersistenceFacade", () => {
  describe("Postgres", () => {
    const usersPersistence = new UsersPersistencePostgresFacade();
    const confirmationCodesPersistence =
      new ConfirmationCodesPersistencePostgresFacade();

    const fakeData = getFakeData();

    const userInfo = fakeData.userFakeInfo;
    let fakeCodeInfo: typeof fakeData.confirmationCodeFakeInfo;

    before(async () => {
      await usersPersistence.add(userInfo);
    });

    beforeEach(() => {
      fakeCodeInfo = {
        ...fakeData.confirmationCodeFakeInfo,
        email: userInfo.email,
      };
    });

    afterEach(async () => {
      await confirmationCodesPersistence.deleteAll();
    });

    after(async () => {
      await usersPersistence.deleteAll();
    });

    it("should not add a code associated with an email that doesn't exist", async () => {
      await expect(
        confirmationCodesPersistence.add({
          ...fakeCodeInfo,
          email: "not@exsit.com",
        })
      ).to.be.rejected;
    });

    it("should add a code and get it", async () => {
      await confirmationCodesPersistence.add(fakeCodeInfo);

      await expect(
        confirmationCodesPersistence.find(fakeCodeInfo.email)
      ).to.eventually.deep.equal(fakeCodeInfo);
    });

    it("should return undefined when trying to get a code with an email that does not exist", async () => {
      await expect(confirmationCodesPersistence.find("not@exist.com")).to
        .eventually.be.undefined;
    });

    it("should update a code and return the updated code information", async () => {
      await confirmationCodesPersistence.add(fakeCodeInfo);

      fakeCodeInfo.code = 1234;
      await expect(
        confirmationCodesPersistence.update(fakeCodeInfo)
      ).to.eventually.deep.equal(fakeCodeInfo);

      await expect(
        confirmationCodesPersistence.find(fakeCodeInfo.email)
      ).to.eventually.deep.equal(fakeCodeInfo);
    });

    it("should delete a code and return the deleted code", async () => {
      await confirmationCodesPersistence.add(fakeCodeInfo);

      const codeInfo = await confirmationCodesPersistence.delete(
        fakeCodeInfo.email
      );
      expect(codeInfo).to.deep.equal(fakeCodeInfo);
      await expect(confirmationCodesPersistence.find(fakeCodeInfo.email)).to
        .eventually.be.undefined;
    });
  });
});

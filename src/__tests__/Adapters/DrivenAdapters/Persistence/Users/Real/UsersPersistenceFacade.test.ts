import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { UsersPersistencePostgresFacade } from "../../../../../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";

import { getFakeData } from "../../../../../__fakes__/data";

chai.use(chaiAsPromised);

describe("UsersPersistenceFacade", () => {
  describe("Postgres", () => {
    const usersPersistence = new UsersPersistencePostgresFacade();
    const fakeData = getFakeData();
    let userInfo: typeof fakeData.userFakeInfo;

    beforeEach(() => {
      userInfo = fakeData.userFakeInfo;
    });

    afterEach(async () => {
      await usersPersistence.deleteAll();
    });

    it("should be able to add a user and get him by id", async () => {
      await usersPersistence.add(userInfo);
      const addedUser = await usersPersistence.getById(userInfo.userId);

      expect(addedUser).to.deep.equal(userInfo);
    });

    it("should be able to add a user and get him by email", async () => {
      await usersPersistence.add(userInfo);
      const addedUser = await usersPersistence.getByEmail(userInfo.email);

      expect(addedUser).to.deep.equal(userInfo);
    });

    it("should return undefined when the email or userId not exist", async () => {
      await expect(usersPersistence.getById("notExist")).to.eventually.be
        .undefined;

      await expect(usersPersistence.getByEmail("not@exist.com")).to.eventually
        .be.undefined;
    });

    it("should not have two users with the same id", async () => {
      await usersPersistence.add(userInfo);

      const { userId, ...rest } = fakeData.userFakeInfo;
      await expect(usersPersistence.add({ userId: userInfo.userId, ...rest }))
        .to.be.rejected;
    });

    it("should not have two users with the same email", async () => {
      await usersPersistence.add(userInfo);

      const { email, ...rest } = fakeData.userFakeInfo;
      await expect(usersPersistence.add({ email: userInfo.email, ...rest })).to
        .be.rejected;
    });

    it("should be able to update the user information", async () => {
      await usersPersistence.add(userInfo);
      const { userId, email, ...rest } = fakeData.userFakeInfo;

      await usersPersistence.update({ ...userInfo, ...rest });

      const newInfo = await usersPersistence.getById(userInfo.userId);
      expect(newInfo).to.deep.equal({ ...userInfo, ...rest });
    });

    it("should be able to search for users by name, ordered by creation time", async () => {
      await usersPersistence.add(userInfo);

      const keyword = userInfo.name.slice(0, 4);
      const searchResult = await usersPersistence.searchFor(keyword);

      expect(searchResult.length).to.equal(1);
      expect(searchResult[0]).to.deep.equal(userInfo);

      const anotherUser = {
        ...fakeData.userFakeInfo,
        name: `${userInfo.name}Smith`,
      };
      await usersPersistence.add(anotherUser);
      const secondSearchResult = await usersPersistence.searchFor(keyword);

      expect(secondSearchResult.length).to.equal(2);
      expect(secondSearchResult[0]).to.deep.equal(anotherUser);
      expect(secondSearchResult[1]).to.deep.equal(userInfo);
    });

    it("should be able to search for users by email, ordered by creation time", async () => {
      await usersPersistence.add(userInfo);

      const keyword = userInfo.email.slice(2, 6);
      const searchResult = await usersPersistence.searchFor(keyword);

      expect(searchResult.length).to.equal(1);
      expect(searchResult[0]).to.deep.equal(userInfo);

      const anotherUser = {
        ...fakeData.userFakeInfo,
        email: `${userInfo.email}.io`,
      };
      await usersPersistence.add(anotherUser);
      const secondSearchResult = await usersPersistence.searchFor(keyword);

      expect(secondSearchResult.length).to.equal(2);
      expect(secondSearchResult[0]).to.deep.equal(anotherUser);
      expect(secondSearchResult[1]).to.deep.equal(userInfo);
    });

    it("should return an empty array from search when no user found", async () => {
      const result = await usersPersistence.searchFor("notExist");
      expect(result.length).to.equal(0);
    });
  });
});

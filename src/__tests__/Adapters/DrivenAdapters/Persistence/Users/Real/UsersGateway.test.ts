import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import type { IUser } from "../../../../../../Domain/User/User.types";
import { User } from "../../../../../../Domain/User";
import { getFakeData } from "../../../../../__fakes__/data";

import { UsersGateway } from "../../../../../../Adapters/DrivenAdapters/Persistence/Users/UsersGateway";

chai.use(chaiAsPromised);

describe("UsersGateway", () => {
  const fakeData = getFakeData();

  const usersPersistence: any = class {};
  const usersGateway = new UsersGateway(new usersPersistence());
  let user: IUser;

  const getNewUser = () => {
    const { email, password, name } = fakeData.user;

    const user = new User({ email, password });
    user.newRegistered(name);

    return user;
  };

  beforeEach(() => {
    user = getNewUser();
  });

  describe("Saving Users", () => {
    usersPersistence.prototype.add = () => user.userInfo();

    it("should save the user and return an him", async () => {
      const returnedUser = await usersGateway.add(user);
      expect(returnedUser.userInfo()).to.deep.equal(user.userInfo());
    });
  });

  describe("Getting Users", () => {
    usersPersistence.prototype.getById = () => undefined;
    usersPersistence.prototype.getByEmail = () => undefined;

    it("should return undefined when the user not exist", async () => {
      await expect(usersGateway.getById("notExist")).to.eventually.be.undefined;
      await expect(usersGateway.getByEmail("not@Exist.com")).to.eventually.be
        .undefined;
    });

    it("should be able to get a user by id", async () => {
      usersPersistence.prototype.getById = () => user.userInfo();

      const targetUser = await usersGateway.getById("existingId");
      expect(targetUser?.userInfo()).to.deep.equal(user.userInfo());
    });

    it("should be able to get the user by email", async () => {
      usersPersistence.prototype.getByEmail = () => user.userInfo();

      const targetUser = await usersGateway.getByEmail("exist@email.com");
      expect(targetUser?.userInfo()).to.deep.equal(user.userInfo());
    });
  });

  describe("Updating Users", () => {
    usersPersistence.prototype.update = () => user;

    it("should update the user and return the updated entity", async () => {
      const updatedUser = await usersGateway.update(user);
      expect(updatedUser.userInfo()).to.deep.equal(updatedUser.userInfo());
    });
  });

  describe("Searching For Users", () => {
    it("should return an empty array when no user found", async () => {
      usersPersistence.prototype.searchFor = () => [];

      await expect(
        usersGateway.searchFor("notExist")
      ).to.eventually.have.lengthOf(0);
    });

    it("should found and return the target users", async () => {
      const users = [getNewUser(), getNewUser(), getNewUser()];
      usersPersistence.prototype.searchFor = () => users;

      const searchResult = await usersGateway.searchFor("exist");

      expect(searchResult.length).to.equal(3);
      searchResult.map((user, index) => {
        expect(user.userInfo()).to.deep.equal(users[index].userInfo());
      });
    });
  });
});

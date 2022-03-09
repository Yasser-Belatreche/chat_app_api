import { expect } from "chai";

import type { IUser } from "../../../../../../Domain/User/User.types";
import { User } from "../../../../../../Domain/User";
import { getFakeData } from "../../../../../__fakes__/data";

import { UsersGateway } from "../../../../../../Adapters/DrivenAdapters/Persistence/Users/UsersGateway";

describe("UsersGateway", () => {
  const fakeData = getFakeData();

  const usersPersistence: any = class {};
  const usersGateway = new UsersGateway(new usersPersistence());
  let user: IUser;

  const getNewUser = () => {
    const { email, password, name } = fakeData.userFakeInfo;

    const user = new User({ email, password });
    user.newRegistered(name);

    return user;
  };

  beforeEach(() => {
    user = getNewUser();
  });

  it("should save the user and return an him", async () => {
    usersPersistence.prototype.add = () => user.userInfo();

    const returnedUser = await usersGateway.add(user);
    expect(returnedUser.userInfo()).to.deep.equal(user.userInfo());
  });

  it("should return undefined when the user not exist", async () => {
    usersPersistence.prototype.getById = () => undefined;
    usersPersistence.prototype.getByEmail = () => undefined;

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

  it("should update the user and return the updated entity", async () => {
    usersPersistence.prototype.update = () => user.userInfo();

    const updatedUser = await usersGateway.update(user);
    expect(updatedUser.userInfo()).to.deep.equal(updatedUser.userInfo());
  });

  it("should return an empty array when no user found by the search", async () => {
    usersPersistence.prototype.searchFor = () => [];

    await expect(
      usersGateway.searchFor("notExist")
    ).to.eventually.have.lengthOf(0);
  });

  it("should search for users, and return the target users", async () => {
    const users = [
      getNewUser().userInfo(),
      getNewUser().userInfo(),
      getNewUser().userInfo(),
    ];
    usersPersistence.prototype.searchFor = () => users;

    const searchResult = await usersGateway.searchFor("exist");

    expect(searchResult.length).to.equal(3);
    searchResult.map((user, index) => {
      expect(user.userInfo()).to.deep.equal(users[index]);
    });
  });
});

import { expect } from "chai";

import type { IUser } from "../../../../../../Domain/User/User.types";
import { User } from "../../../../../../Domain/User";

import { getFakeData } from "../../../../../__fakes__/data";
import { UsersGatewayFake } from "../../../../../__fakes__/dependencies/Persistence/UsersGatewayFake";

describe("UsersGatewayFake", () => {
  const usersGateway = new UsersGatewayFake();
  const fakeData = getFakeData();
  let user: IUser;

  const isFound = (users: IUser[]) => {
    return users.find((u) => u.userId === user.userId);
  };

  const getNewUser = () => {
    const { email, password, name } = fakeData.userFakeInfo;

    const user = new User({ email, password });
    user.newRegistered(name);

    return user;
  };

  beforeEach(() => {
    user = getNewUser();
  });

  afterEach(() => {
    usersGateway.deleteAll();
  });

  it("should save a user and get him by id", async () => {
    const returnUser = await usersGateway.add(user);
    expect(returnUser.userId).to.equal(user.userId);

    const targetUser = await usersGateway.getById(returnUser.userId);
    expect(targetUser?.userId).to.equal(user.userId);
  });

  it("should save a user and get him by email", async () => {
    const returnUser = await usersGateway.add(user);
    expect(returnUser.userInfo()).to.deep.equal(user.userInfo());

    const targetUser = await usersGateway.getByEmail(returnUser.email);
    expect(targetUser?.userInfo()).to.deep.equal(user.userInfo());
  });

  it("should return undefined when the user not exist", async () => {
    const user1 = await usersGateway.getById("noExist");
    expect(user1).to.be.undefined;

    const user2 = await usersGateway.getByEmail("no@Exist.com");
    expect(user2).to.be.undefined;
  });

  it("should update a user", async () => {
    await usersGateway.add(user);

    const updatedInfo = { isConfirmed: true, name: "yasser" };
    user.confirm();
    user.name = updatedInfo.name;

    await usersGateway.update(user);

    const userInDb = await usersGateway.getById(user.userId);
    expect(userInDb?.isConfirmed).to.equal(updatedInfo.isConfirmed);
    expect(userInDb?.name).to.equal(updatedInfo.name);
  });

  it("should return an empty array when no user found by the search", async () => {
    const result = await usersGateway.searchFor("doesn't exist");
    expect(result.length).to.equal(0);
  });

  it("should be able to search for users by name", async () => {
    await usersGateway.add(user);

    const searchKeword = user.name.slice(1, 4);
    const searchResult = await usersGateway.searchFor(searchKeword);

    expect(isFound(searchResult)).to.not.be.undefined;
  });

  it("should search for users by email", async () => {
    await usersGateway.add(user);

    const searchKeword = user.email.slice(0, 4);
    const searchResult = await usersGateway.searchFor(searchKeword);

    expect(isFound(searchResult)).to.not.be.undefined;
  });
});

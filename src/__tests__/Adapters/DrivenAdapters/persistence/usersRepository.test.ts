import { expect } from "chai";

import { makeUser } from "../../../../Domain/User/User.Factory";

import { getFakeData } from "../../../__fakes__/data";
import { getFakeDependencies } from "../../../__fakes__/dependencies";
import { usersRepository as fakeUsersRepository } from "../../../__fakes__/dependencies/persistence/usersRepository";

const { idGenerator } = getFakeDependencies();
const User = makeUser({ idGenerator });

const handler = (usersRepository: typeof fakeUsersRepository) => () => {
  const fakeData = getFakeData();

  const getNewUser = () => {
    const user = new User({
      email: fakeData.user.email,
      password: fakeData.user.password,
    });
    user.isANewRegistred("john smith");

    return user;
  };

  it("should save a user", async () => {
    const user = getNewUser();

    const returnUser = await usersRepository.add(user);
    expect(returnUser).to.equal(user);

    const targetUser = await usersRepository.getById(returnUser.userId);
    expect(targetUser).to.equal(user);
  });

  it("should return a user by userId", async () => {
    const user = getNewUser();
    await usersRepository.add(user);

    const foundUser = await usersRepository.getById(user.userId);
    expect(foundUser).to.equal(user);
  });

  it("should return a user by email", async () => {
    const user = getNewUser();
    await usersRepository.add(user);

    const foundUser = await usersRepository.getByEmail(user.email);

    expect(foundUser).to.equal(user);
  });

  it("should update a user", async () => {
    const user = getNewUser();
    await usersRepository.add(user);

    const updatedInfo = { isConfirmed: true, name: "yasser" };
    user.isConfirmed = updatedInfo.isConfirmed;
    user.name = updatedInfo.name;

    await usersRepository.update(user);

    const userInDb = await usersRepository.getById(user.userId);

    expect(userInDb?.isConfirmed).to.equal(updatedInfo.isConfirmed);
    expect(userInDb?.name).to.equal(updatedInfo.name);
  });
};

describe("usersRepository", () => {
  describe("Fake", handler(fakeUsersRepository));
});

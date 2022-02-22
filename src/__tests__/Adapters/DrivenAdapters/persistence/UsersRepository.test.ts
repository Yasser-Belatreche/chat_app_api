import { expect } from "chai";

import { makeUser } from "../../../../Domain/User/User.Factory";

import type { IUsersRepository } from "../../../../Ports/DrivenPorts/persistence/persistence.interface";

import { getFakeData } from "../../../__fakes__/data";
import { getFakeDependencies } from "../../../__fakes__/dependencies";
import { usersRepository as fakeUsersRepository } from "../../../__fakes__/dependencies/persistence/usersRepository";
import { UsersRepository } from "../../../../Adapters/DrivenAdapters/Persistence/UsersRepository";

const { IdGeneratorFake } = getFakeDependencies();
const User = makeUser({ idGenerator: new IdGeneratorFake() });

const handler = (usersRepository: IUsersRepository) => () => {
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
    user.confirm();
    user.name = updatedInfo.name;

    await usersRepository.update(user);

    const userInDb = await usersRepository.getById(user.userId);

    expect(userInDb?.isConfirmed).to.equal(updatedInfo.isConfirmed);
    expect(userInDb?.name).to.equal(updatedInfo.name);
  });

  it("should be able to search for users by name of email", async () => {
    const user = getNewUser();
    await usersRepository.add(user);

    const isFound = (result: any[]) => {
      return result.find((u) => u.userId === user.userId);
    };

    let searchKeword = user.name.slice(1, 4);
    let searchResult = await usersRepository.searchFor(searchKeword);

    expect(isFound(searchResult)).to.not.be.undefined;

    searchKeword = user.email.slice(0, 4);
    searchResult = await usersRepository.searchFor(searchKeword);

    expect(isFound(searchResult)).to.not.be.undefined;
  });
};

describe("usersRepository", () => {
  describe("Fake", handler(fakeUsersRepository));
  describe("Real", handler(new UsersRepository()));
});

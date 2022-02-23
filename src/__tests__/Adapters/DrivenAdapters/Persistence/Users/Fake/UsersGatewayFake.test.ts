import { expect } from "chai";

import type { IUser } from "../../../../../../Domain/User/User.types";
import { User } from "../../../../../../Domain/User";

import { getFakeData } from "../../../../../__fakes__/data";
import { UsersGatewayFake } from "../../../../../__fakes__/dependencies/Persistence/UsersGateway";

describe("UsersGatewayFake", () => {
  const usersGateway = new UsersGatewayFake();
  const fakeData = getFakeData();
  let user: IUser;

  const getNewUser = () => {
    const { email, password, name } = fakeData.user;

    const user = new User({ email, password });
    user.isANewRegistred(name);

    return user;
  };

  beforeEach(() => {
    user = getNewUser();
  });

  describe("Saving Users", () => {
    it("should save a user", async () => {
      const returnUser = await usersGateway.add(user);
      expect(returnUser.userId).to.equal(user.userId);

      const targetUser = await usersGateway.getById(returnUser.userId);
      expect(targetUser?.userId).to.equal(user.userId);
    });
  });

  describe("Getting Users", () => {
    it("should return undefined when the user not exist", async () => {
      const user1 = await usersGateway.getById("noExist");
      expect(user1).to.be.undefined;

      const user2 = await usersGateway.getByEmail("no@Exist.com");
      expect(user2).to.be.undefined;
    });
    it("should return a user by userId", async () => {
      await usersGateway.add(user);

      const foundUser = await usersGateway.getById(user.userId);
      expect(foundUser?.userId).to.equal(user.userId);
    });

    it("should return a user by email", async () => {
      await usersGateway.add(user);

      const foundUser = await usersGateway.getByEmail(user.email);
      expect(foundUser?.userId).to.equal(user.userId);
    });
  });

  describe("Updating Users", () => {
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
  });

  describe("Searching For Users", () => {
    const isFound = (users: IUser[]) => {
      return users.find((u) => u.userId === user.userId);
    };

    it("should return an empty array when no user found", async () => {
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
});

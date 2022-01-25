/**
 * 2 - should return the contacts list with the latest message in every conversation with each contact
 */

import { expect } from "chai";
import faker from "faker";
import Sinon from "sinon";

import { getMocks } from "../../__mocks__";

import { makeSearchForUser } from "./SearchForUser.factory";

describe("SearchForUser use case", () => {
  const {
    tokenManager,
    DB: { usersRepository },
    user,
  } = getMocks();

  const decodedAuthId = faker.datatype.uuid();
  const validArgs = {
    authToken: faker.datatype.string(20),
    searchKeyword: faker.internet.userName(),
  };

  const searchForUser = makeSearchForUser({ tokenManager, usersRepository });

  it("should not be able to search if he had an unvalid token", async () => {
    tokenManager.decode = () => {
      throw new Error("invalid auth token");
    };

    await expect(
      searchForUser({ ...validArgs, authToken: "invalid token" })
    ).to.be.rejectedWith("invalid auth token");

    tokenManager.decode = Sinon.spy(() => decodedAuthId);
  });

  it("search for empty string should return an empty array", async () => {
    await expect(searchForUser({ ...validArgs, searchKeyword: "" }))
      .to.eventually.be.an("array")
      .with.lengthOf(0);
  });

  it("should return an empty array when the search keyword did not match any user name or email", async () => {
    usersRepository.searchForUsers = () => Promise.resolve([]);

    await expect(
      searchForUser({ ...validArgs, searchKeyword: "not existing user" })
    )
      .to.eventually.be.an("array")
      .with.lengthOf(0);

    usersRepository.searchForUsers = Sinon.spy(() =>
      Promise.resolve(Array(10).fill(user))
    );
  });

  it("return a list of matching users if exist", async () => {
    await expect(searchForUser(validArgs))
      .to.eventually.be.an("array")
      .to.deep.include(user);
  });
});

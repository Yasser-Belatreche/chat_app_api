import { expect } from "chai";

import { makeSearchForUser } from "../../UseCases/UsersUseCases/SearchForUser/SearchForUser";

import { getFakeDependencies } from "../__fakes__/dependencies";
import {
  registerAndConfirmRandomUser,
  registerRandomUser,
} from "./_utils_/getRegistredUser";

const { tokenManager, usersRepository } = getFakeDependencies();
const searchForUser = makeSearchForUser({ tokenManager, usersRepository });

describe("UsersUseCases", () => {
  it("user with wrong authToken cannot perform a search", async () => {
    await expect(
      searchForUser({ authToken: "wrongToken", searchKeyword: "hel" })
    ).to.be.rejected;
  });

  it("not confirmed user cannot perform a search", async () => {
    const { token } = await registerRandomUser();

    await expect(searchForUser({ authToken: token, searchKeyword: "hel" })).to
      .be.rejected;
  });

  it("should found a user by name or email", async () => {
    const { token: authToken } = await registerAndConfirmRandomUser();
    const { user: target } = await registerAndConfirmRandomUser();

    let searchKeyword = target.name.slice(1, 4);
    let searchResult = await searchForUser({ authToken, searchKeyword });

    const isFound = searchResult.some(({ userId }) => userId == target.userId);
    expect(isFound).to.be.true;
  });

  it("should not get not confirmed users in the search result", async () => {
    const { token: authToken } = await registerAndConfirmRandomUser();
    const { user: target } = await registerRandomUser();

    let searchKeyword = target.name.slice(1, 4);
    let searchResult = await searchForUser({ authToken, searchKeyword });

    const isFound = searchResult.some(({ userId }) => userId == target.userId);
    expect(isFound).be.false;
  });
});

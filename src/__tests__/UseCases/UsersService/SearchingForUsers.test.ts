import { expect } from "chai";

import {
  getNonConfirmedUser,
  getConfirmedUser,
} from "../_utils_/getRegistredUser";
import { fakeDependencies } from "../../__fakes__/dependencies";

import { getUsersServiceWithFakeDepencies } from "./setup/getUsersServiceWithFakeDependencies";

describe("UsersService - Searching For Users", () => {
  const { usersGateway } = fakeDependencies;
  const usersService = getUsersServiceWithFakeDepencies();

  let authUser: any;

  beforeEach(async () => {
    authUser = await getConfirmedUser();
  });

  afterEach(() => {
    usersGateway.deleteAll();
  });

  it("user with wrong authToken cannot perform a search", async () => {
    await expect(
      usersService.searchForUsers({
        authToken: "wrongToken",
        searchKeyword: "hel",
      })
    ).to.be.rejected;
  });

  it("not confirmed user cannot perform a search", async () => {
    const { token: authToken } = await getNonConfirmedUser();

    await expect(
      usersService.searchForUsers({ authToken, searchKeyword: "hel" })
    ).to.be.rejected;
  });

  it("should found a user by name", async () => {
    const authToken = authUser.token;
    const { user: target } = await getConfirmedUser();

    const searchKeyword = target.name.slice(1, 4);
    const searchResult = await usersService.searchForUsers({
      authToken,
      searchKeyword,
    });

    const isFound = searchResult.some(({ userId }) => userId == target.userId);
    expect(isFound).to.be.true;
  });

  it("should found a user by email", async () => {
    const authToken = authUser.token;
    const { user: target } = await getConfirmedUser();

    const searchKeyword = target.email.slice(1, 4);
    const searchResult = await usersService.searchForUsers({
      authToken,
      searchKeyword,
    });

    const isFound = searchResult.some(({ userId }) => userId == target.userId);
    expect(isFound).to.be.true;
  });

  it("should not get not confirmed users in the search result", async () => {
    const authToken = authUser.token;
    const { user: target } = await getNonConfirmedUser();

    const searchKeyword = target.name.slice(1, 4);
    const searchResult = await usersService.searchForUsers({
      authToken,
      searchKeyword,
    });

    const isFound = searchResult.some(({ userId }) => userId == target.userId);
    expect(isFound).be.false;
  });
});

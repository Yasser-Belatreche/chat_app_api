import type { IUser } from "../../Domain/User/User.types";
import { expect } from "chai";

import { makeSendMessage } from "../../UseCases/MessagesService/SendMessage/SendMessage";
import { makeGetContactsList } from "../../UseCases/UsersService/GetContactsList/GetContactsList";
import { makeSearchForUser } from "../../UseCases/UsersService/SearchForUser/SearchForUser";

import { getFakeDependencies } from "../__fakes__/dependencies";
import {
  registerAndConfirmRandomUser,
  registerRandomUser,
} from "./_utils_/getRegistredUser";

const {
  tokenManager,
  usersRepository,
  messagesRepository,
  notificationsManager,
} = getFakeDependencies();
const searchForUser = makeSearchForUser({ tokenManager, usersRepository });
const sendMessage = makeSendMessage({
  messagesRepository,
  notificationsManager,
  tokenManager,
  usersRepository,
});
const getContactsList = makeGetContactsList({
  tokenManager,
  usersRepository,
  messagesRepository,
});

describe("UsersUseCases", () => {
  let authUser: any, randomUsers: { user: IUser; token: string }[];

  before(async () => {
    authUser = await registerAndConfirmRandomUser();
    randomUsers = await register4RandomUsers();
  });

  describe("Search For Users", () => {
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
      const authToken = authUser.token;
      const target = randomUsers[0].user;

      let searchKeyword = target.name.slice(1, 4);
      let searchResult = await searchForUser({ authToken, searchKeyword });

      const isFound = searchResult.some(
        ({ userId }) => userId == target.userId
      );
      expect(isFound).to.be.true;
    });

    it("should not get not confirmed users in the search result", async () => {
      const authToken = authUser.token;
      const { user: target } = await registerRandomUser();

      let searchKeyword = target.name.slice(1, 4);
      let searchResult = await searchForUser({ authToken, searchKeyword });

      const isFound = searchResult.some(
        ({ userId }) => userId == target.userId
      );
      expect(isFound).be.false;
    });
  });

  describe("Getting Contacts List", () => {
    let authToken: string;

    before(async () => {
      authToken = (await authUser).token;
    });

    it("should not be able to get contacts with an unvalid token", async () => {
      await expect(getContactsList({ authToken: "wrongToken" })).to.be.rejected;
    });

    it("should get an empty list when the user didn't send any message", async () => {
      await expect(getContactsList({ authToken })).to.eventually.have.length(0);
    });

    it("when the user send some messages to 1 user, should get a list of length 1", async () => {
      for (let i = 0; i < 3; i++) {
        await sendMessage({
          authToken,
          receiverId: randomUsers[0].user.userId,
          content: "eh",
        });
      }
      await expect(getContactsList({ authToken })).to.eventually.have.length(1);
    });

    it("the number of contacts should be equal to the number of users that the authUser talked with before", async () => {
      for (let i = 0; i < 3; i++) {
        await sendMessage({
          authToken,
          receiverId: randomUsers[i].user.userId,
          content: "eh",
        });
      }
      await expect(getContactsList({ authToken })).to.eventually.have.length(3);
    });

    it("should get the latestMessage information along with the contact information, sorted by the latest message send date", async () => {
      const receiver = randomUsers[2];

      await sendMessage({
        authToken,
        receiverId: receiver.user.userId,
        content: "hello user 2",
      });
      const contactsList = await getContactsList({ authToken });

      expect(contactsList[0].latestMessage.content).to.equal("hello user 2");
      expect(contactsList[0].contact?.userId).to.equal(receiver.user.userId);
    });
  });
});

const register4RandomUsers = async () => {
  return await Promise.all([
    registerAndConfirmRandomUser(),
    registerAndConfirmRandomUser(),
    registerAndConfirmRandomUser(),
    registerAndConfirmRandomUser(),
  ]);
};

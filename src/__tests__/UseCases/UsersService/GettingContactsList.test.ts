import { expect } from "chai";

import { fakeDependencies } from "../../__fakes__/dependencies";
import { getConfirmedUser } from "../_utils_/getRegistredUser";

import { getMessagesServiceWithFakeDependencies } from "../MessagesService/setup/getMessagesServiceWithFakeDependencies";
import { getUsersServiceWithFakeDepencies } from "./setup/getUsersServiceWithFakeDependencies";

describe("UsersService - Getting Contacts List", () => {
  const { usersGateway, messagesGateway } = fakeDependencies;

  const usersService = getUsersServiceWithFakeDepencies();
  const messagesService = getMessagesServiceWithFakeDependencies();

  let authUser: any;

  before(async () => {
    authUser = await getConfirmedUser();
  });

  afterEach(() => {
    messagesGateway.deleteAll();
  });

  after(() => {
    usersGateway.deleteAll();
  });

  it("should not be able to get contacts with an unvalid token", async () => {
    await expect(usersService.getContacts("wrongToken")).to.be.rejected;
  });

  it("should get an empty list when the user didn't send any message", async () => {
    await expect(
      usersService.getContacts(authUser.token)
    ).to.eventually.have.length(0);
  });

  it("when the user send some messages to 1 user, should get a list of length 1", async () => {
    const receiver = await getConfirmedUser();

    for (let i = 0; i < 3; i++) {
      await messagesService.sendMessage({
        authToken: authUser.token,
        receiverId: receiver.user.userId,
        content: "eh",
      });
    }
    await expect(
      usersService.getContacts(authUser.token)
    ).to.eventually.have.length(1);
  });

  it("the number of contacts should be equal to the number of users that the authUser talked with before", async () => {
    const randomUsers = await Promise.all([
      getConfirmedUser(),
      getConfirmedUser(),
      getConfirmedUser(),
    ]);

    for (let i = 0; i < randomUsers.length; i++) {
      await messagesService.sendMessage({
        authToken: authUser.token,
        receiverId: randomUsers[i].user.userId,
        content: "eh",
      });
    }
    await expect(
      usersService.getContacts(authUser.token)
    ).to.eventually.have.length(3);
  });

  it("should get the latestMessage information along with the contact information, sorted by the latest message send date", async () => {
    const receiver = await getConfirmedUser();

    await messagesService.sendMessage({
      authToken: authUser.token,
      receiverId: receiver.user.userId,
      content: "hello user 2",
    });

    const contactsList = await usersService.getContacts(authUser.token);

    expect(contactsList[0].latestMessage.content).to.equal("hello user 2");
    expect(contactsList[0].contact?.userId).to.equal(receiver.user.userId);
  });
});

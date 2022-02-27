import { expect } from "chai";
import { IUser } from "../../../Domain/User/User.types";
import { MessagesServiceFacade } from "../../../UseCases/MessagesService/MessagesServiceFacade";
import { fakeDependencies } from "../../__fakes__/dependencies";
import { getConfirmedUser } from "../_utils_/getRegistredUser";

describe("MessagesService - Getting Messages", () => {
  const { tokenManager, usersGateway, messagesGateway, notificationsManager } =
    fakeDependencies;
  const messagesService = new MessagesServiceFacade(
    tokenManager,
    usersGateway,
    messagesGateway,
    notificationsManager
  );

  let gettingMessagesArgs: any;

  before(async () => {
    const { token: authToken } = await getConfirmedUser();
    const {
      user: { userId: chatParticipantId },
    } = await getConfirmedUser();

    gettingMessagesArgs = { authToken, chatParticipantId };
  });

  after(() => {
    usersGateway.deleteAll();
  });

  it("should return an empty list when no message sent between the two users", async () => {
    const messages = await messagesService.getMessages(gettingMessagesArgs);
    expect(messages.length).to.equal(0);
  });

  it("should not be able to get the messages of a user with a wrong token", async () => {
    await expect(
      messagesService.getMessages({
        ...gettingMessagesArgs,
        authToken: "wrongToken",
      })
    ).to.be.rejected;
  });

  it("should get (by default) the latest 20 messages between the two target users, ordered by createdAt", async () => {
    const { authToken, chatParticipantId } = gettingMessagesArgs;
    for (let i = 1; i <= 22; i++)
      await messagesService.sendMessage({
        authToken,
        receiverId: chatParticipantId,
        content: `${i}`,
      });

    const messages = await messagesService.getMessages(gettingMessagesArgs);
    expect(messages.length).to.equal(20);
    expect(messages[0].content).to.equal("22");
    expect(messages[19].content).to.equal("3");
  });

  it("should be able to customize the number of messages returned, also the number of the messages chunk", async () => {
    const { authToken, chatParticipantId } = gettingMessagesArgs;
    for (let i = 1; i <= 5; i++)
      await messagesService.sendMessage({
        authToken,
        receiverId: chatParticipantId,
        content: `${i}`,
      });

    const messages = await messagesService.getMessages({
      ...gettingMessagesArgs,
      numOfChunk: 2,
      numOfMessagesPerChunk: 2,
    });
    expect(messages.length).to.equal(2);
    expect(messages[0].content).to.equal("3");
    expect(messages[1].content).to.equal("2");
  });
});

import Sinon from "sinon";
import { expect } from "chai";

import {
  getConfirmedUser,
  getNonConfirmedUser,
} from "../_utils_/getRegistredUser";
import { fakeDependencies } from "../../__fakes__/dependencies";

import { MessagesServiceFacade } from "../../../UseCases/MessagesService/MessagesServiceFacade";

describe("MessagesService - Sending Messages", () => {
  const { tokenManager, usersGateway, messagesGateway, notificationsManager } =
    fakeDependencies;

  const newMessageNotification = Sinon.spy(notificationsManager, "newMessage");
  const messagesService = new MessagesServiceFacade(
    tokenManager,
    usersGateway,
    messagesGateway,
    notificationsManager
  );

  let sendingMessageArgs: any;

  before(async () => {
    const { token: authToken } = await getConfirmedUser();
    const { user: receiver } = await getConfirmedUser();

    sendingMessageArgs = {
      authToken,
      receiverId: receiver.userId,
      content: "hello there !",
    };
  });

  afterEach(() => {
    messagesGateway.deleteAll();
    newMessageNotification.resetHistory();
  });

  after(() => {
    usersGateway.deleteAll();
  });

  it("should not be able to send a message to a non existing user", async () => {
    await expect(
      messagesService.sendMessage({ ...sendingMessageArgs, receiverId: "NON" })
    ).to.be.rejected;
  });

  it("should not be able to send an empty message", async () => {
    await expect(
      messagesService.sendMessage({ ...sendingMessageArgs, content: "" })
    ).to.be.rejected;
  });

  it("non confirmed user cannot send or receive messages", async () => {
    const {
      token: authToken,
      user: { userId: receiverId },
    } = await getNonConfirmedUser();

    await expect(
      messagesService.sendMessage({ ...sendingMessageArgs, authToken })
    ).to.be.rejected;
    await expect(
      messagesService.sendMessage({ ...sendingMessageArgs, receiverId })
    ).to.be.rejected;
  });

  it("should send the message to the target user when everything is ok", async () => {
    const { receiverId, content, authToken } = sendingMessageArgs;

    await expect(messagesService.sendMessage(sendingMessageArgs)).to.be
      .fulfilled;
    expect(newMessageNotification.calledOnce).to.be.true;

    const messagesList = await messagesService.getMessages({
      authToken,
      chatParticipantId: receiverId,
      numOfMessagesPerChunk: 1,
    });

    expect(messagesList[0]).to.have.property("content", content);
    expect(messagesList[0]).to.have.property("receiverId", receiverId);
  });
});

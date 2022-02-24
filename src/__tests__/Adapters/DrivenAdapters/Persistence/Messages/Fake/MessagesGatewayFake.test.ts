import { expect } from "chai";

import type { IMessage } from "../../../../../../Domain/Message/Message.types";
import { Message } from "../../../../../../Domain/Message";
import { getFakeData } from "../../../../../__fakes__/data";

import { MessagesGatewayFake } from "../../../../../__fakes__/dependencies/Persistence/MessagesGatewayFake";

describe("MessagesGatewayFake", () => {
  const messagesGateway = new MessagesGatewayFake();
  const fakeData = getFakeData();

  const senderId = fakeData.userFakeInfo.userId;
  const receiverId = fakeData.userFakeInfo.userId;

  let message: IMessage;
  const getNewMessage = (content?: string) => {
    const message = new Message({
      content: content || "hello bro !",
      senderId,
      receiverId,
    });
    message.createdNow();

    return message;
  };

  beforeEach(() => {
    message = getNewMessage();
    for (let i = 1; i <= 20; i++)
      messagesGateway.add(getNewMessage(i.toString()));
  });

  afterEach(() => {
    messagesGateway.deleteAll();
  });

  it("should add a message and get it", async () => {
    messagesGateway.deleteAll();
    await messagesGateway.add(message);
    const messagesList = await messagesGateway.getMessages({
      between: message.receiverId,
      and: message.senderId,
    });

    expect(messagesList.length).to.equal(1);
    expect(messagesList[0].messageInfo()).to.deep.equal(message.messageInfo());
  });

  it("should get the latest 20 messages (by default)", async () => {
    const messagesList = await messagesGateway.getMessages({
      between: senderId,
      and: receiverId,
    });
    const length = messagesList.length;

    expect(length).to.equal(20);
    expect(messagesList[0]).to.have.property("content", "20");
    expect(messagesList[length - 1]).to.have.property("content", "1");
  });

  it("should be able to change the max number of messages returned", async () => {
    const messagesList = await messagesGateway.getMessages({
      between: senderId,
      and: receiverId,
      numOfMessagesPerChunk: 10,
    });
    const length = messagesList.length;

    expect(length).to.equal(10);
    expect(messagesList[0]).to.have.property("content", "20");
    expect(messagesList[length - 1]).to.have.property("content", "11");
  });

  it("should be able to change the messages chunk number", async () => {
    const messagesList = await messagesGateway.getMessages({
      between: senderId,
      and: receiverId,
      numOfMessagesPerChunk: 10,
      numOfChunk: 2,
    });
    const length = messagesList.length;

    expect(length).to.equal(10);
    expect(messagesList[0]).to.have.property("content", "10");
    expect(messagesList[length - 1]).to.have.property("content", "1");
  });

  it("should get just the messages between the two target users", async () => {
    const sendersIds = ["1", "2", "3"];
    const receiversIds = ["4", "5", "6"];

    sendersIds.forEach((senderId, index) => {
      const args = {
        content: "hello friend",
        senderId,
        receiverId: receiversIds[index],
      };
      messagesGateway.add(new Message(args));
    });

    sendersIds.forEach(async (senderId, index) => {
      const messagesList = await messagesGateway.getMessages({
        between: senderId,
        and: receiversIds[index],
      });
      messagesList.forEach((message) => {
        expect(message).to.have.property("senderId", senderId);
        expect(message).to.have.property("receiverId", receiversIds[index]);
      });
    });
  });
});

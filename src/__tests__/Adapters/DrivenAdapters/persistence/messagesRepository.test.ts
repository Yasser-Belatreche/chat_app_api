import { expect } from "chai";

import { Message } from "../../../../Domain/Message/Message";
import { messagesRepository as fakeMessagesRepository } from "../../../__fakes__/dependencies/persistence/messagesRepository";

const handler = (messagesRepository: typeof fakeMessagesRepository) => () => {
  const senderId = "senderId";
  const receiverId = "receiverId";

  const getNewMessage = (content?: string) => {
    return new Message({
      content: content || "hello bro !",
      senderId,
      receiverId,
    });
  };

  it("should be able to add a message", async () => {
    const message = getNewMessage();

    await messagesRepository.add(message);

    const messagesList = await messagesRepository.getMessages({
      between: message.receiverId,
      and: message.senderId,
    });

    expect(messagesList[0].content).to.equal(message.content);
    expect(messagesList[0].senderId).to.equal(message.senderId);
    expect(messagesList[0].receiverId).to.equal(message.receiverId);
  });

  it("should return the latest 20 messages", async () => {
    [...Array(30)].forEach(async (_, index) => {
      await messagesRepository.add(getNewMessage(index.toString()));
    });

    const messagesList = await messagesRepository.getMessages({
      between: senderId,
      and: receiverId,
    });

    expect(messagesList.length).to.equal(20);
  });

  it("should be able to change the max number of messages returned", async () => {
    [...Array(30)].forEach(async (_, index) => {
      await messagesRepository.add(getNewMessage(index.toString()));
    });

    const messagesList = await messagesRepository.getMessages({
      between: senderId,
      and: receiverId,
      numOfMessagesPerChunk: 10,
    });

    expect(messagesList.length).to.equal(10);
  });

  it("should be able to get the second, third.. chunk of messages, and each chunk contain a customisable number of messages", async () => {
    [...Array(60)].forEach(async (_, index) => {
      await messagesRepository.add(getNewMessage(index.toString()));
    });

    const messagesList = await messagesRepository.getMessages({
      between: senderId,
      and: receiverId,
      numOfMessagesPerChunk: 30,
      numOfChunk: 2,
    });

    expect(messagesList[0]).to.have.property("content", "30");
    expect(messagesList[messagesList.length - 1]).to.have.property(
      "content",
      "60"
    );
  });
};

describe("messagesRepository", () => {
  describe("Fake", handler(fakeMessagesRepository));
});

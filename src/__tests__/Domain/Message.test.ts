import { expect } from "chai";

import { getFakeData } from "../__fakes__/data";
import { fakeDependencies } from "../__fakes__/dependencies";

import { makeMessage } from "../../Domain/Message/MessageFactory";

describe("Message Entity", () => {
  const { idGenerator } = fakeDependencies;
  const Message = makeMessage({ idGenerator });

  const fakeData = getFakeData();
  const validMessageArgs = fakeData.messageFakeInfo;

  it("should not be able to have a message with an empty content", () => {
    expect(() => new Message({ ...validMessageArgs, content: "" })).to.throw();
  });

  it("should not have a message without a senderId or a receiverId", () => {
    expect(
      () => new Message({ ...validMessageArgs, receiverId: "", senderId: "" })
    ).to.throw();
  });

  it("should not be able to change the properties after being set one time", () => {
    const message = new Message(validMessageArgs);
    message.messageId = fakeData.messageFakeInfo.messageId;
    message.seen = false;
    message.createdAt = new Date().toJSON();

    expect(() => (message.seen = true)).to.throw();
    expect(() => (message.createdAt = new Date().toJSON())).to.throw();
    expect(() => (message.messageId = "someId")).to.throw();
  });

  it("should not be able to set the date to an invalid date", () => {
    const message = new Message(validMessageArgs);
    expect(() => (message.createdAt = "someText")).to.throw();
  });

  it("should generate a random id for the message, and initialize it with default values when calling createdNow()", () => {
    const message = new Message(validMessageArgs);
    message.createdNow();

    expect(message.messageId).to.be.a("string");
    expect(message.receiverId).to.equal(validMessageArgs.receiverId);
    expect(message.senderId).to.equal(validMessageArgs.senderId);
    expect(message.content).to.equal(validMessageArgs.content.trim());
    expect(message.seen).to.be.false;
    expect(message.createdAt).to.be.a("string");

    const anotherMessage = new Message(validMessageArgs);
    anotherMessage.createdNow();

    expect(anotherMessage.messageId).to.not.equal(message.messageId);
  });

  it("should be able to retrieve the message information", () => {
    const message = new Message(validMessageArgs);
    message.createdNow();

    const messageInfo = message.messageInfo();

    expect(messageInfo.messageId).to.equal(message.messageId);
    expect(messageInfo.receiverId).to.equal(message.receiverId);
    expect(messageInfo.senderId).to.equal(message.senderId);
    expect(messageInfo.content).to.equal(message.content);
    expect(messageInfo.createdAt).to.equal(message.createdAt);
    expect(messageInfo.seen).to.equal(message.seen);
  });
});

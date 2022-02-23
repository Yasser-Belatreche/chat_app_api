import { expect } from "chai";
import { makeMessage } from "../../Domain/Message/Message.Factory";

import { getFakeDependencies } from "../__fakes__/dependencies";

const { IdGeneratorFake } = getFakeDependencies();

const Message = makeMessage({ idGenerator: new IdGeneratorFake() });

describe("Message Entity", () => {
  const validMessage = {
    receiverId: "someValidId",
    senderId: "anotherValidId",
    content: "hello my friend !!",
  };

  it("should not be able to have a message with an empty content", () => {
    expect(() => new Message({ ...validMessage, content: "" })).to.throw();
  });

  it("should not have a message without a senderId or a receiverId", () => {
    expect(
      () => new Message({ ...validMessage, receiverId: "", senderId: "" })
    ).to.throw();
  });

  it("should generate a random id for the message, and initialize it with default values", () => {
    const message = new Message(validMessage);

    expect(message.messageId).to.be.a("string");
    expect(message.receiverId).to.equal(validMessage.receiverId);
    expect(message.senderId).to.equal(validMessage.senderId);
    expect(message.content).to.equal(validMessage.content.trim());
    expect(message.seen).to.be.false;
    expect(message.createdAt).to.be.a("string");
    expect(() => new Date(message.createdAt)).to.not.throw();

    const antherMessage = new Message(validMessage);
    expect(antherMessage.messageId).to.not.equal(message.messageId);
  });

  it("should be able to retrieve the message information", () => {
    const message = new Message(validMessage);

    const messageInfo = message.messageInfo();

    expect(messageInfo.messageId).to.equal(message.messageId);
    expect(messageInfo.receiverId).to.equal(message.receiverId);
    expect(messageInfo.senderId).to.equal(message.senderId);
    expect(messageInfo.content).to.equal(message.content);
    expect(messageInfo.createdAt).to.equal(message.createdAt);
    expect(messageInfo.seen).to.equal(message.seen);
  });
});

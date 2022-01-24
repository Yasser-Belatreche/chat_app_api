/**
 * 1 - should not have a message without a senderId
 * 2 - should not have a message without a receiverId
 * 3 - should not have a message without a content
 */

import { expect } from "chai";

import { makeMessage } from "./Message.factory";

describe("Message entity", () => {
  const Message = makeMessage();
  const validMessage = {
    content: "hello",
    receiverId: "someReceiverId",
    senderId: "someSenderId",
  };

  it("should not have a message without a sender", () => {
    const messageWithoutSender = {
      ...validMessage,
      senderId: "",
    };
    expect(() => new Message(messageWithoutSender)).to.throw(
      "message should have a sender"
    );
  });

  it("should not have a message witout a receiver", () => {
    const messageWithoutReceiver = {
      ...validMessage,
      receiverId: "",
    };
    expect(() => new Message(messageWithoutReceiver)).to.throw(
      "message should have a receiver"
    );
  });

  it("should not have a message with no content", () => {
    const messageWithoutContent = {
      ...validMessage,
      content: "",
    };
    expect(() => new Message(messageWithoutContent)).to.throw(
      "message should have a content"
    );
  });

  it("should be able to access instance properties formated", () => {
    const messages = [
      {
        content: "hello     ",
        receiverId: "someReceiverId ",
        senderId: " someSenderId",
      },
      {
        content: " another message     ",
        receiverId: "anotherReceiverId ",
        senderId: " antotherRenderId",
      },
      {
        content: "anther one  ",
        receiverId: "anotherOneId ",
        senderId: "  anotherOneId",
      },
    ];

    messages.forEach(({ content, receiverId, senderId }) => {
      const message = new Message({ content, receiverId, senderId });

      expect(message.content).to.equal(content.trim());
      expect(message.senderId).to.equal(senderId.trim());
      expect(message.receiverId).to.equal(receiverId.trim());
    });
  });
});

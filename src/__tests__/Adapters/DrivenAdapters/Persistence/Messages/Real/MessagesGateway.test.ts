import Sinon from "sinon";
import { expect } from "chai";

import type { IMessage } from "../../../../../../Domain/Message/Message.types";

import { MessagesGateway } from "../../../../../../Adapters/DrivenAdapters/Persistence/Messages/MessagesGateway";
import { Message } from "../../../../../../Domain/Message";

import { getFakeData } from "../../../../../__fakes__/data";

describe("MessagesGateway", () => {
  const fakeData = getFakeData();

  const messagesPersistence: any = class {};
  const messgesGateway = new MessagesGateway(new messagesPersistence());
  let message: IMessage;

  const getNewMessage = (): IMessage => {
    const { messageFakeInfo } = fakeData;
    const message = new Message(messageFakeInfo);

    message.messageId = messageFakeInfo.messageId;
    message.seen = messageFakeInfo.seen;
    message.createdAt = messageFakeInfo.createdAt;

    return message;
  };

  beforeEach(() => {
    message = getNewMessage();
  });

  it("should add new message and return the message entity", async () => {
    messagesPersistence.prototype.add = Sinon.stub().resolves(
      message.messageInfo()
    );

    const addedMessage = await messgesGateway.add(message);
    expect(addedMessage.messageInfo()).to.deep.equal(message.messageInfo());
    expect(messagesPersistence.prototype.add.calledOnce).to.be.true;
  });

  it("should return get an array of messages entities between two users", async () => {
    const messagesInfos = [
      getNewMessage().messageInfo(),
      getNewMessage().messageInfo(),
      getNewMessage().messageInfo(),
    ];
    messagesPersistence.prototype.getMessages =
      Sinon.stub().resolves(messagesInfos);

    const messages = await messgesGateway.getMessages({
      and: message.senderId,
      between: message.receiverId,
    });

    expect(messages.length).to.equal(3);
    expect(messagesPersistence.prototype.getMessages.calledOnce).to.be.true;
    messages.forEach((message, i) => {
      expect(message.messageInfo()).to.deep.equal(messagesInfos[i]);
    });
  });

  it("should return an empty array when no messages found", async () => {
    messagesPersistence.prototype.getMessages = Sinon.stub().resolves([]);

    const messages = await messgesGateway.getMessages({
      and: message.senderId,
      between: message.receiverId,
    });
    expect(messages.length).to.equal(0);
  });

  it("should be able to get the last message with every user", async () => {
    messagesPersistence.prototype.getLastMessageWithEveryUser =
      Sinon.stub().resolves([message.messageInfo()]);

    const messages = await messgesGateway.getLastMessageWithEveryUser("userId");

    expect(messages.length).to.equal(1);
    expect(messages[0].messageInfo()).to.deep.equal(message.messageInfo());
    expect(messagesPersistence.prototype.getLastMessageWithEveryUser.calledOnce)
      .to.be.true;
  });
});

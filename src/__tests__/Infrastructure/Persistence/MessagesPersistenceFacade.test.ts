import { expect } from "chai";

import { MessagesPresistencePostgresFacade } from "../../../Adapters/DrivenAdapters/Persistence/Messages/MessagesPersistenceFacade";
import { UsersPersistencePostgresFacade } from "../../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";

import { getFakeData } from "../../__fakes__/data";

describe("MessagesPersistenceFacade", () => {
  describe("Postgres", () => {
    const messagesPersistence = new MessagesPresistencePostgresFacade();
    const usersPersistence = new UsersPersistencePostgresFacade();

    const fakeDate = getFakeData();

    const user1 = fakeDate.userFakeInfo;
    const user2 = fakeDate.userFakeInfo;
    let messageInfo: typeof fakeDate.messageFakeInfo;

    const getMessageInfo = (content?: string) => {
      let senderId: string = user1.userId;
      let receiverId: string = user2.userId;

      const randomNum = Math.floor(Math.random() * 10);
      if (randomNum < 5) {
        senderId = user2.userId;
        receiverId = user1.userId;
      }

      return {
        ...fakeDate.messageFakeInfo,
        ...(content && { content }),
        senderId,
        receiverId,
      };
    };

    before(async () => {
      await usersPersistence.add(user1);
      await usersPersistence.add(user2);
    });

    beforeEach(() => {
      messageInfo = getMessageInfo();
    });

    afterEach(async () => {
      await messagesPersistence.deleteAll();
    });

    after(async () => {
      await usersPersistence.deleteAll();
    });

    it("should fail to add a message when the sender or the receiver doesn't exist", async () => {
      await expect(
        messagesPersistence.add({ ...messageInfo, receiverId: "notExsit" })
      ).to.be.rejected;
      await expect(
        messagesPersistence.add({ ...messageInfo, senderId: "notExsit" })
      ).to.be.rejected;
    });

    it("should add a message and get it", async () => {
      await messagesPersistence.add(messageInfo);
      const messagesInfo = await messagesPersistence.getMessages({
        between: messageInfo.senderId,
        and: messageInfo.receiverId,
      });
      expect(messagesInfo.length).to.equal(1);
      expect(messagesInfo[0]).to.deep.equal(messageInfo);
    });

    it("should get an empty list when there is no messages between the two users", async () => {
      const messagesInfo = await messagesPersistence.getMessages({
        between: messageInfo.senderId,
        and: messageInfo.receiverId,
      });
      expect(messagesInfo.length).to.equal(0);
    });

    it("should get the latest 20 message between the two users by default", async () => {
      for (let i = 1; i <= 22; i++)
        await messagesPersistence.add(getMessageInfo(`${i}`));

      const messages = await messagesPersistence.getMessages({
        between: user1.userId,
        and: user2.userId,
      });
      expect(messages.length).to.equal(20);
      expect(messages[0].content).to.equal("22");
      expect(messages[19].content).to.equal("3");
    });

    it("should be able to change the number of messages returned", async () => {
      for (let i = 1; i <= 5; i++)
        await messagesPersistence.add(getMessageInfo(`${i}`));

      const messages = await messagesPersistence.getMessages({
        between: user1.userId,
        and: user2.userId,
        numOfMessagesPerChunk: 2,
      });
      expect(messages.length).to.equal(2);
      expect(messages[0].content).to.equal("5");
      expect(messages[1].content).to.equal("4");
    });

    it("should be able to change the number of chunk of messages returned", async () => {
      for (let i = 1; i <= 5; i++)
        await messagesPersistence.add(getMessageInfo(`${i}`));

      const messages = await messagesPersistence.getMessages({
        between: user1.userId,
        and: user2.userId,
        numOfMessagesPerChunk: 2,
        numOfChunk: 2,
      });
      expect(messages.length).to.equal(2);
      expect(messages[0].content).to.equal("3");
      expect(messages[1].content).to.equal("2");
    });

    it("should return an empty list when trying to get the latest message with every user, and you didn't talk to any one yet", async () => {
      const messages = await messagesPersistence.getLastMessageWithEveryUser(
        user1.userId
      );
      expect(messages.length).to.equal(0);
    });

    it("should get one last message, when trying to get the latest messages with every user, and you talked just with one person", async () => {
      for (let i = 1; i <= 5; i++)
        await messagesPersistence.add(getMessageInfo(`${i}`));

      const messages = await messagesPersistence.getLastMessageWithEveryUser(
        user1.userId
      );
      expect(messages.length).to.equal(1);
      expect(messages[0].content).to.equal("5");
    });

    it("should get the last message with every person that a user talked with", async () => {
      const user3 = fakeDate.userFakeInfo;
      const user4 = fakeDate.userFakeInfo;
      await usersPersistence.add(user3);
      await usersPersistence.add(user4);

      for (let i = 1; i <= 3; i++)
        await messagesPersistence.add(getMessageInfo(`user2-${i}`));

      for (let i = 1; i <= 2; i++)
        await messagesPersistence.add({
          ...getMessageInfo(`user3-${i}`),
          senderId: user3.userId,
          receiverId: user1.userId,
        });
      for (let i = 3; i <= 4; i++)
        await messagesPersistence.add({
          ...getMessageInfo(`user3-${i}`),
          senderId: user1.userId,
          receiverId: user3.userId,
        });

      for (let i = 1; i <= 2; i++)
        await messagesPersistence.add({
          ...getMessageInfo(`user4-${i}`),
          senderId: user1.userId,
          receiverId: user4.userId,
        });
      for (let i = 3; i <= 5; i++)
        await messagesPersistence.add({
          ...getMessageInfo(`user4-${i}`),
          senderId: user4.userId,
          receiverId: user1.userId,
        });

      const messages = await messagesPersistence.getLastMessageWithEveryUser(
        user1.userId
      );

      expect(messages.length).to.equal(3);
      expect(messages[0].content).to.equal("user4-5");
      expect(messages[1].content).to.equal("user3-4");
      expect(messages[2].content).to.equal("user2-3");
    });
  });
});

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

  describe("Adding a message", () => {
    it("should add a message", async () => {
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
  });

  describe("Getting Messages", () => {
    before(async () => {
      for (let i = 1; i <= 20; i++)
        await messagesRepository.add(getNewMessage(i.toString()));
    });

    it("should get the latest 20 messages (by default)", async () => {
      const messagesList = await messagesRepository.getMessages({
        between: senderId,
        and: receiverId,
      });
      const length = messagesList.length;

      expect(length).to.equal(20);
      expect(messagesList[0]).to.have.property("content", "20");
      expect(messagesList[length - 1]).to.have.property("content", "1");
    });

    it("should be able to change the max number of messages returned", async () => {
      const messagesList = await messagesRepository.getMessages({
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
      const messagesList = await messagesRepository.getMessages({
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

      sendersIds.forEach(async (senderId, index) => {
        const args = {
          content: "hello friend",
          senderId,
          receiverId: receiversIds[index],
        };
        await messagesRepository.add(new Message(args));
      });

      sendersIds.forEach(async (senderId, index) => {
        const messagesList = await messagesRepository.getMessages({
          between: senderId,
          and: receiversIds[index],
        });
        messagesList.forEach((message) => {
          expect(message).to.have.property("senderId", senderId);
          expect(message).to.have.property("receiverId", receiversIds[index]);
        });
      });
    });

    it("should get the last message with every user", async () => {
      const authUserId = "someId";
      const randomUsersIds = ["2", "3", "4"];

      for (let i = 0; i < randomUsersIds.length; i++) {
        for (let j = 0; j < 3; j++) {
          await messagesRepository.add(
            new Message({
              content: j.toString(),
              receiverId: randomUsersIds[i],
              senderId: authUserId,
            })
          );
        }
      }
      const messagesList = await messagesRepository.getLastMessageWithEveryUser(
        authUserId
      );

      expect(messagesList).to.have.length(3);
      expect(messagesList[0]).to.have.property(
        "receiverId",
        randomUsersIds[randomUsersIds.length - 1]
      );
      expect(messagesList[0]).to.have.property("content", "2");
      expect(messagesList[1]).to.have.property(
        "receiverId",
        randomUsersIds[randomUsersIds.length - 2]
      );
      expect(messagesList[1]).to.have.property("content", "2");

      expect(messagesList[2]).to.have.property(
        "receiverId",
        randomUsersIds[randomUsersIds.length - 3]
      );
      expect(messagesList[2]).to.have.property("content", "2");
    });
  });
};

describe("messagesRepository", () => {
  describe("Fake", handler(fakeMessagesRepository));
});

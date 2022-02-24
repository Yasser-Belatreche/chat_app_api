import { expect } from "chai";

import { MessagesPresistencePostgresFacade } from "../../../../../../Adapters/DrivenAdapters/Persistence/Messages/MessagesPersistenceFacade";
import { UsersPersistencePostgresFacade } from "../../../../../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";

import { getFakeData } from "../../../../../__fakes__/data";

describe("MessagesPersistenceFacade", () => {
  describe("Postgres", () => {
    const messagesPersistence = new MessagesPresistencePostgresFacade();
    const usersPersistence = new UsersPersistencePostgresFacade();

    const fakeDate = getFakeData();

    let user1 = fakeDate.userFakeInfo;
    let user2 = fakeDate.userFakeInfo;
    let messageInfo: typeof fakeDate.messageFakeInfo;

    before(async () => {
      await usersPersistence.add(user1);
      await usersPersistence.add(user2);
    });

    beforeEach(() => {
      messageInfo = {
        ...fakeDate.messageFakeInfo,
        senderId: user1.userId,
        receiverId: user2.userId,
      };
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
      expect(messagesInfo[0]).to.deep.equal(messageInfo);
    });

    it.skip("should get all the messages between the two target users", () => {});
  });
});

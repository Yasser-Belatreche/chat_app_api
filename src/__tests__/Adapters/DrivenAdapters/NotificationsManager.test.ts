import Sinon from "sinon";
import { expect } from "chai";
import { EventEmitter } from "events";

import { NotificationManager } from "../../../Adapters/DrivenAdapters/NotificationsManager/NotificationsManager";
import type { INotificationsEmitter } from "../../../Adapters/DrivenAdapters/NotificationsManager/NotificationsManager.types";

import { getFakeData } from "../../__fakes__/data";

describe("NotificationsManager", () => {
  describe("Real", () => {
    const notificationsEmitter: INotificationsEmitter = new EventEmitter();
    const newMessageListener = Sinon.mock();
    notificationsEmitter.on("NEW_MESSAGE", newMessageListener);

    const notificationManager = new NotificationManager(notificationsEmitter);
    const fakeData = getFakeData();

    it("should notify the listener when a new messages comes in", () => {
      const args = {
        message: fakeData.messageFakeInfo,
        sender: fakeData.userFakeInfo,
      };
      notificationManager.newMessage(args);

      expect(newMessageListener.calledOnce).to.be.true;
      expect(newMessageListener.args[0][0]).to.deep.equal(args);
    });
  });
});

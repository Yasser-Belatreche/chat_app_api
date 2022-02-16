import { NotificationsManager } from "../../../Ports/DrivenPorts/NotificationsManager/notificationsManager.interface";

const notificationsManager: NotificationsManager = {
  newMessage: async () => {
    return new Promise((resolve) => setTimeout(resolve, 2));
  },
};

export { notificationsManager };

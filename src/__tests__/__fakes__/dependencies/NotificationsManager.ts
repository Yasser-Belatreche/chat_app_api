import { INotificationsManager } from "../../../Ports/DrivenPorts/NotificationsManager/NotificationsManager.interface";

const notificationsManager: INotificationsManager = {
  newMessage: async () => {
    return new Promise((resolve) => setTimeout(resolve, 2));
  },
};

export { notificationsManager };

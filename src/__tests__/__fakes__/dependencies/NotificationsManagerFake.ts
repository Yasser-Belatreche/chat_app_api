import { INotificationsManager } from "../../../Ports/DrivenPorts/NotificationsManager/NotificationsManager.interface";

class NotificationsManagerFake implements INotificationsManager {
  newMessage(message: any): void {}
}

export { NotificationsManagerFake };

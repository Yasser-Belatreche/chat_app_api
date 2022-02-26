import type { INotificationsManager } from "./NotificationsManager.interface";
import { NotificationManager } from "../../../Adapters/DrivenAdapters/NotificationsManager/NotificationsManager";

// change it later
import { EventEmitter } from "stream";

const notificationManger: INotificationsManager = new NotificationManager(
  new EventEmitter()
);

export { notificationManger };

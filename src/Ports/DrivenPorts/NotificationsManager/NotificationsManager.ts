import type { INotificationsManager } from "./NotificationsManager.interface";

import { NotificationManager } from "../../../Adapters/DrivenAdapters/NotificationsManager/NotificationsManager";
import { notificationsEmitter } from "../../../Adapters/DrivenAdapters/NotificationsManager/NotificationsEmitter";

const notificationManger: INotificationsManager = new NotificationManager(
  notificationsEmitter
);

export { notificationManger };

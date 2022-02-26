import type { INotificationsManager } from "../../../Ports/DrivenPorts/NotificationsManager/NotificationsManager.interface";
import type {
  INotificationsEmitter,
  NewMessageArgs,
} from "./NotificationsManager.types";

class NotificationManager implements INotificationsManager {
  constructor(private readonly notificationsEmitter: INotificationsEmitter) {}

  newMessage(args: NewMessageArgs): void {
    this.notificationsEmitter.emit("NEW_MESSAGE", args);
  }
}

export { NotificationManager };

import EventEmitter from "events";

import type { INotificationsEmitter } from "./NotificationsManager.types";

const notificationsEmitter: INotificationsEmitter = new EventEmitter();

export { notificationsEmitter };

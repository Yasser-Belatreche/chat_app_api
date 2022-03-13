import type { NotificationsArgs } from "../../../DrivenAdapters/NotificationsManager/NotificationsManager.types";

type x = keyof NotificationsArgs;

export type ServerToClientEvents = {
  [T in keyof NotificationsArgs]: (args: NotificationsArgs[T]) => void;
};

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {
  userId: String;
}

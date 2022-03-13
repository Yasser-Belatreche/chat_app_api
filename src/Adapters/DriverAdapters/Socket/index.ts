import type { Server as HttpServer } from "http";

import { Server } from "socket.io";
import { notificationsEmitter } from "../../DrivenAdapters/NotificationsManager/NotificationsEmitter";

import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./@types/socket.interfaces";

const startSocket = (httpServer: HttpServer) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  io.on("connection", (socket) => {});

  notificationsEmitter.on("NEW_MESSAGE", (data) => {
    io.to(data.message.receiverId).emit("NEW_MESSAGE", data);
  });
};

export { startSocket };

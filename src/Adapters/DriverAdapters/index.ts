import { startHTTPServer } from "./REST";
import { startSocket } from "./Socket";

const startApp = () => {
  const server = startHTTPServer();

  startSocket(server);
  return server;
};

export { startApp };

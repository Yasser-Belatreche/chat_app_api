import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import env from "dotenv";

import { allRoutes } from "./routes";

const startExpressServer = () => {
  const app: Express = express();

  env.config();

  process.env.NODE_ENV === "DEV" && app.use(morgan("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/api", allRoutes);

  const PORT: number | string = process.env.PORT || 5000;

  return app.listen(PORT, () => {
    console.log(`server is listening on post ${PORT}`);
  });
};

export { startExpressServer };

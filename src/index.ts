// import express, { Express } from "express";
// import cors from "cors";
// import morgan from "morgan";

// import { router } from "./Adapters/DriverAdapters/REST/routes";

// const app: Express = express();

// // configs
// require("dotenv").config();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

// // initialize the routes
// app.use("/api", router);

// const PORT: number | string = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`server is listening on post ${PORT}`);
// });

// export { server }; // for the api tests

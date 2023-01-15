import express from "express";
import { config } from "dotenv";
import ErrrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";

const app = express();

// path setup to enviromental variable
config({
  path: "./config/config.env",
});

//Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// Importing and using routes
import courses from "./routes/courseRoutes.js";
import users from "./routes/userRoutes.js";

app.use("/api/v1", courses);
app.use("/api/v1", users);

export default app;

// custom error handler middleware
app.use(ErrrorMiddleware);

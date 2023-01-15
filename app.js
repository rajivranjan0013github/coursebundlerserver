import express from "express";
import { config } from "dotenv";
import ErrrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

// Importing and using routes
import courses from "./routes/courseRoutes.js";
import users from "./routes/userRoutes.js";

app.use("/api/v1", courses);
app.use("/api/v1", users);

export default app;

app.use("/", (req, res) =>
  res.send(
    `<h1>Site is working on. Click <a href=${process.env.FRONTEND_URL}>click</a></h1>`
  )
);

// custom error handler middleware
app.use(ErrrorMiddleware);

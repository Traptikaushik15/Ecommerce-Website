const express = require("express");

const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Update with the correct origin
    credentials: true,
  })
);
app.use(cookieParser());

// Mounting the Router
app.use("/api/v1/users", userRouter);

module.exports = app;

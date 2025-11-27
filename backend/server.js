import express from "express";
import http from "http";
import cors from "cors";
import { initSocket } from "./socket.js";
import { ENV } from "./config/env.js";
import router from "./router.js";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app);
const PORT = ENV.PORT;

app.use(express.json(  ));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,             
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


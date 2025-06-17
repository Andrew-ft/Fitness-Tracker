import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import router from "./router.js";
import morgan from "morgan";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookReport from "./router/community/bookReport.js";

dotenv.config();

const app = express();
const port = 8080;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: true }));

app.listen(port);

app.use("/community", bookReport);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

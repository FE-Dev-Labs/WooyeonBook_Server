import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import community from "./src/router/community/community.js";
import view from "./src/router/community/view.js";
import list from "./src/router/list.js";
import search from "./src/router/search.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: true }));

app.listen(process.env.PORT);

app.use("/community", community);
app.use("/view", view);
app.use("/list", list);
app.use("/search", search);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

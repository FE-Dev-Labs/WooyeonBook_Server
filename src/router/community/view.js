import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

router.use((req, res, next) => {
  console.log("middleware for view!");
  next();
});

router.get("/:page", async (req, res) => {
  const { num } = req.query;
  const limit = 9;
  const offset = (num - 1) * limit;
  try {
    const { data } = await supabase
      .from(`${req.params.page}`)
      .select("*")
      .eq("created_at", "desc")
      .range(offset, offset + limit);
    return res.status(200).send(data);
  } catch (err) {
    res.status(400).send;
  }
});
router.get("/popularList", async (req, res) => {
  try {
    const bookReport = await supabase.from("bookReport").select("*");
    const bookMeeting = await supabase.from("bookMeeting").select("*");
    const bookBuying = await supabase.from("bookBuying").select("*");
    const bookSelling = await supabase.from("bookSelling").select("*");

    const data = [
      ...bookReport.data,
      ...bookMeeting.data,
      ...bookBuying.data,
      ...bookSelling.data,
    ];
    const sortedData = data
      .sort((a, b) => b.like_users.length - a.like_users.length)
      .slice(0, 6);
    res.status(200).send(sortedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;

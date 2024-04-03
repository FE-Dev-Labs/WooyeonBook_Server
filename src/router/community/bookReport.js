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
  console.log("middleware for bookReports!");
  next();
});

router.get("/bookReport/:docid", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookReport")
      .select("*")
      .eq("doc_id", req.params.docid);
    if (error) {
      throw error;
    }
    res.status(200).send(data[0]);
  } catch (err) {
    res.status(400).send;
  }
});

export default router;

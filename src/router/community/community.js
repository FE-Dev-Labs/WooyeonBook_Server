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
router.get("/bookSelling/:docid", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookSelling")
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
router.get("/bookMeeting/:docid", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookMeeting")
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
router.get("/bookBuying/:docid", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookBuying")
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
router.get("/detail/:page/:docid", async (req, res) => {
  try {
    const { data } = await supabase
      .from(`${req.params.page}`)
      .select("*")
      .eq("doc_id", req.params.docid);
    return res.status(200).send(data[0]);
  } catch (err) {
    res.status(400).send;
  }
});
router.post("/create/:page", async (req, res) => {
  const postData = req.body;

  const { data, error } = await supabase
    .from(`${req.params.page}`)
    .insert([postData]);

  if (error) {
    return res.status(400).send(error);
  }
  return res.status(200).send("success");
});
router.put("/update/:page/:docid", async (req, res) => {
  const updateData = req.body;
  const { data, error } = await supabase
    .from(`${req.params.page}`)
    .update(updateData)
    .eq("doc_id", req.params.docid);

  if (error) {
    return res.status(400).send(error);
  }
  return res.status(200).send("success");
});

export default router;

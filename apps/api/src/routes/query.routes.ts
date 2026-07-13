import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { question } = req.body;

  res.json({
    question,
    status: "received",
  });
});

export default router;

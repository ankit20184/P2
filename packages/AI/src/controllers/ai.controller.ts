import { Request, Response } from "express";
import { aiService } from "../services/ai.services.js";

export async function askAI(req: Request, res: Response) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const result = await aiService.query(question);

    return res.json(result);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

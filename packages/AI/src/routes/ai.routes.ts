import { Router } from "express";
import { askAI } from "../controllers/ai.controller.js";

const router = Router();

router.post("/query", askAI);

export default router;

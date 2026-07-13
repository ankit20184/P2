import { Router } from "express";
import { askAI } from "../controllers/ai.controller";

const router = Router();

router.post("/query", askAI);

export default router;

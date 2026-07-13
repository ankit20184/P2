import { Router } from "express";
import { aiController} from "../controllar/ai.controller";

const router = Router();

router.post(
 "/query",
 aiController
);



export default router;
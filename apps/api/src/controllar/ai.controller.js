"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiController = aiController;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ai_1 = require("@repo/ai");
async function aiController(req, res) {
    try {
        const { question } = req.body;
        const result = await ai_1.workflow.invoke({
            question,
        });
        res.json(JSON.parse(JSON.stringify(result, (_, value) => typeof value === "bigint" ? Number(value) : value)));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "AI workflow failed",
        });
    }
}

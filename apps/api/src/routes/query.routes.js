"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { question } = req.body;
    res.json({
        question,
        status: "received",
    });
});
exports.default = router;

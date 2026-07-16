"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", async (_, res) => {
    res.json([
        {
            id: 1,
            question: "Top customers",
            createdAt: new Date(),
        },
        {
            id: 2,
            question: "Revenue by month",
            createdAt: new Date(),
        },
    ]);
});
exports.default = router;

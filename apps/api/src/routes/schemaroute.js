"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", async (_, res) => {
    res.json({
        tables: [
            {
                name: "Customer",
                columns: ["id", "name", "email", "city", "country"],
            },
            {
                name: "Product",
                columns: ["id", "name", "category", "price"],
            },
            {
                name: "Order",
                columns: ["id", "customerId", "status", "total", "createdAt"],
            },
            {
                name: "OrderItem",
                columns: ["orderId", "productId", "quantity", "price"],
            },
        ],
    });
});
exports.default = router;

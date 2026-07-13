import { Router } from "express";

const router = Router();

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
export default router;

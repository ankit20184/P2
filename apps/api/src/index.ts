import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI BI API running",
  });
});

app.use("/ai", aiRoutes);

app.listen(4000, () => {
  console.log("API running on port 4000");
});

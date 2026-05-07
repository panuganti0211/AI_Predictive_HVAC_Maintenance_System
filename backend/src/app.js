const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const hvacRoutes = require("./routes/hvacRoutes");
const alertRoutes = require("./routes/alertRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "hvac-maintenance-ai-backend" });
});

app.use("/api/hvac", hvacRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

app.use(errorHandler);

module.exports = app;


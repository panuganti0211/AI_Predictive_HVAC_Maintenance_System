const { detectAnomaly } = require("../services/anomalyDetectionService");
const { generateInsight } = require("../services/aiService");
const { store } = require("../services/store");

const analyzeHvac = async (req, res) => {
  const id = req.body.hvacId;
  if (!id) {
    res.status(400).json({ message: "hvacId is required." });
    return;
  }

  const unit = store.hvacUnits.find((h) => h.id === id);
  if (!unit) {
    res.status(404).json({ message: "HVAC not found." });
    return;
  }

  const anomaly = detectAnomaly(unit);
  const explanation = await generateInsight(unit, anomaly.reasons);

  res.json({
    data: {
      hvacId: unit.id,
      riskScore: anomaly.riskScore,
      reasons: anomaly.reasons,
      confidence: anomaly.confidence,
      explanation,
      recommendation: anomaly.riskScore > 60 ? "Inspect fan/motor subsystem first." : "Continue monitored diagnostics.",
    },
  });
};

module.exports = { analyzeHvac };


const { assistantAnswer } = require("../services/aiService");
const { store } = require("../services/store");

const chatWithAssistant = async (req, res) => {
  const question = req.body.message;
  if (!question) {
    res.status(400).json({ message: "message is required." });
    return;
  }

  const context = JSON.stringify(
    store.hvacUnits.map((h) => ({
      id: h.id,
      name: h.name,
      status: h.healthStatus,
      riskScore: h.riskScore,
      insight: h.latestInsight,
      latest: h.sensors[h.sensors.length - 1],
    }))
  );

  const answer = await assistantAnswer(question, context);
  res.json({ data: { answer } });
};

module.exports = { chatWithAssistant };


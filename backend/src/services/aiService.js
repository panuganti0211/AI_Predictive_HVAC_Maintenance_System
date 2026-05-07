const apiKey = process.env.GEMINI_API_KEY;
let client = null;

const getClient = async () => {
  if (!apiKey) return null;
  if (client) return client;

  const { GoogleGenAI } = require("@google/genai");
  client = new GoogleGenAI({ apiKey });
  return client;
};

const generateInsight = async (unit, reasons) => {
  const aiClient = await getClient();
  if (!aiClient) {
    return `${unit.name} risk pattern indicates ${reasons.join(" ")} Recommend targeted mechanical and airflow inspection.`;
  }

  const prompt = `You are an HVAC maintenance copilot.
Unit: ${unit.name}
Location: ${unit.location}
Risk score: ${unit.riskScore}
Reasons: ${reasons.join("; ")}
Give concise insight with likely root cause and recommended action in 2 sentences.`;

  const response = await aiClient.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text || "AI insight unavailable.";
};

const assistantAnswer = async (question, context) => {
  const aiClient = await getClient();
  if (!aiClient) {
    return `Based on current data, prioritize the highest risk HVAC first. Context considered: ${context
      .slice(0, 280)}...`;
  }

  const response = await aiClient.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are helping a factory technician.
Question: ${question}
Operational data context: ${context}
Provide practical answer with action order.`,
  });

  return response.text || "No assistant answer generated.";
};

module.exports = { generateInsight, assistantAnswer };


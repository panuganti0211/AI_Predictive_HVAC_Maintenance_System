const scoreToSeverity = (riskScore) => {
  if (riskScore >= 75) return "CRITICAL";
  if (riskScore >= 55) return "HIGH";
  if (riskScore >= 35) return "MEDIUM";
  return "LOW";
};

const shouldEmitAlert = (riskScore, reasonsCount) => {
  if (riskScore >= 55) return true;
  return riskScore >= 35 && reasonsCount >= 2;
};

const urgencyForSeverity = (severity) => {
  const map = {
    LOW: "Monitor during next routine inspection.",
    MEDIUM: "Inspect within 24 hours.",
    HIGH: "Inspect within 8 hours.",
    CRITICAL: "Immediate inspection required within 2 hours.",
  };
  return map[severity];
};

module.exports = { scoreToSeverity, shouldEmitAlert, urgencyForSeverity };


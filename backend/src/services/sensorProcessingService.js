const { randomUUID } = require("crypto");

const { detectAnomaly } = require("./anomalyDetectionService");
const { generateInsight } = require("./aiService");
const {
  scoreToSeverity,
  shouldEmitAlert,
  urgencyForSeverity,
} = require("./alertPrioritizationService");
const { store } = require("./store");

const checklistBySeverity = {
  LOW: ["Validate sensor calibration", "Observe airflow at vents"],
  MEDIUM: ["Inspect belt tension", "Check filters and obstructions", "Verify pressure damper movement"],
  HIGH: ["Inspect fan assembly", "Check motor bearing wear", "Confirm duct leakage points"],
  CRITICAL: ["Shut down impacted zone if unsafe", "Mechanical inspection immediately", "Escalate to maintenance supervisor"],
};

const processSensorUpdate = async (hvacId, point) => {
  const unit = store.hvacUnits.find((item) => item.id === hvacId);
  if (!unit) return;

  unit.sensors.push(point);
  unit.sensors = unit.sensors.slice(-50);
  unit.lastUpdated = point.timestamp;

  const anomaly = detectAnomaly(unit);
  unit.riskScore = anomaly.riskScore;

  unit.healthStatus =
    anomaly.riskScore >= 70 ? "Critical" : anomaly.riskScore >= 40 ? "Warning" : "Healthy";

  if (anomaly.reasons.length) {
    unit.latestInsight = await generateInsight(unit, anomaly.reasons);
  }

  if (!shouldEmitAlert(anomaly.riskScore, anomaly.reasons.length)) {
    unit.activeAlertCount = store.alerts.filter((a) => a.hvacId === unit.id).length;
    return;
  }

  const severity = scoreToSeverity(anomaly.riskScore);
  const alert = {
    id: randomUUID(),
    hvacId: unit.id,
    hvacName: unit.name,
    severity,
    confidence: Number(anomaly.confidence.toFixed(2)),
    explanation: unit.latestInsight,
    recommendation:
      severity === "CRITICAL"
        ? "Immediate mechanical inspection."
        : "Schedule targeted component inspection.",
    inspectionChecklist: checklistBySeverity[severity] || checklistBySeverity.MEDIUM,
    urgency: urgencyForSeverity(severity),
    createdAt: new Date().toISOString(),
  };

  const duplicate = store.alerts.find(
    (a) =>
      a.hvacId === alert.hvacId &&
      a.severity === alert.severity &&
      Date.now() - new Date(a.createdAt).getTime() < 10 * 60 * 1000
  );

  if (!duplicate) {
    store.alerts.unshift(alert);
    store.alerts = store.alerts.slice(0, 100);
  }

  unit.activeAlertCount = store.alerts.filter((a) => a.hvacId === unit.id).length;
};

module.exports = { processSensorUpdate };


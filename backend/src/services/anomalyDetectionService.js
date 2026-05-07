const avg = (points, key) => {
  const values = points
    .map((p) => Number(p[key]))
    .filter((v) => Number.isFinite(v));
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
};

const detectAnomaly = (unit) => {
  const points = unit.sensors.slice(-8);
  const last = points[points.length - 1];
  if (!last) {
    return { riskScore: 0, reasons: ["No recent sensor data."], confidence: 0.4 };
  }

  const tAvg = avg(points, "temperature");
  const aAvg = avg(points, "airflow");
  const vAvg = avg(points, "vibration");
  const pAvg = avg(points, "pressure");

  const reasons = [];
  let risk = 0;

  if (last.temperature > tAvg + 3) {
    risk += 20;
    reasons.push("Temperature spike against moving average.");
  }
  if (last.vibration > vAvg + 1.2) {
    risk += 30;
    reasons.push("Sudden vibration increase detected.");
  }
  if (last.airflow < aAvg - 6) {
    risk += 22;
    reasons.push("Airflow dropped below expected trend.");
  }
  if (Math.abs(last.pressure - pAvg) > 5) {
    risk += 16;
    reasons.push("Pressure fluctuation exceeds stable band.");
  }
  if (last.vibration > vAvg + 0.8 && last.airflow < aAvg - 4) {
    risk += 25;
    reasons.push("High vibration plus low airflow suggests fan obstruction/imbalance.");
  }

  const trendTemp = points[points.length - 1].temperature - points[0].temperature;
  if (trendTemp > 2.5) {
    risk += 14;
    reasons.push("Rising temperature trend observed.");
  }

  const confidence = Math.min(0.95, 0.55 + reasons.length * 0.08);
  return { riskScore: Math.min(100, risk), reasons, confidence };
};

module.exports = { detectAnomaly };


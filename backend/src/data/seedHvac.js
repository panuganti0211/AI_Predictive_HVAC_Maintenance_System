const now = new Date().toISOString();

const base = (id, name, location) => ({
  id: `hvac-${id}`,
  name,
  location,
  healthStatus: "Healthy",
  riskScore: 12 + id * 5,
  latestInsight: "Operating within normal pattern.",
  activeAlertCount: 0,
  lastUpdated: now,
  sensors: Array.from({ length: 12 }).map((_, i) => ({
    temperature: 22 + id + Math.sin(i) * 1.5,
    airflow: 65 - id + Math.cos(i) * 3,
    vibration: 2 + id * 0.2 + Math.random() * 0.5,
    pressure: 100 + id * 1.5 + Math.sin(i / 2) * 2,
    timestamp: new Date(Date.now() - (12 - i) * 60000).toISOString(),
  })),
});

const seedHvacData = [
  base(1, "HVAC-1", "Assembly Zone A"),
  base(2, "HVAC-2", "Packaging Wing"),
  base(3, "HVAC-3", "Storage Hall"),
  base(4, "HVAC-4", "Metal Processing"),
  base(5, "HVAC-5", "Cooling Plant Room"),
];

module.exports = { seedHvacData };


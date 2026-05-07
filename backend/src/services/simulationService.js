const { processSensorUpdate } = require("./sensorProcessingService");
const { store } = require("./store");

const jitter = (base, range) => base + (Math.random() * 2 - 1) * range;

const createReading = (idNumber) => {
  const stress = Math.random() > 0.85 ? 1.8 : 1;
  return {
    temperature: Number(jitter(23 + idNumber, 2.8 * stress).toFixed(2)),
    airflow: Number(jitter(64 - idNumber, 5.5 / stress).toFixed(2)),
    vibration: Number(jitter(2.2 + idNumber * 0.3, 1.1 * stress).toFixed(2)),
    pressure: Number(jitter(101 + idNumber * 1.2, 4.3 * stress).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
};

const startSensorSimulation = () => {
  setInterval(async () => {
    for (const unit of store.hvacUnits) {
      const idNumber = Number(unit.id.replace("hvac-", ""));
      await processSensorUpdate(unit.id, createReading(idNumber));
    }
  }, 5000);
};

module.exports = { startSensorSimulation };


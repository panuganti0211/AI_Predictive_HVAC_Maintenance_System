const mongoose = require("mongoose");
const app = require("./app");
const { startSensorSimulation } = require("./services/simulationService");

const PORT = Number(process.env.PORT || 5000);
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      // eslint-disable-next-line no-console
      console.log("MongoDB connected.");
    } else {
      // eslint-disable-next-line no-console
      console.log("MONGO_URI not set. Running with in-memory simulation store.");
    }

    startSensorSimulation();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
};

void start();


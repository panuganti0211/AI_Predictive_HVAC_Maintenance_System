const { seedHvacData } = require("../data/seedHvac");

const store = {
  hvacUnits: seedHvacData,
  alerts: [],
};

module.exports = { store };


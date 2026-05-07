const { store } = require("../services/store");

const getAllHvac = (_req, res) => {
  res.json({ data: store.hvacUnits });
};

const getHvacById = (req, res) => {
  const unit = store.hvacUnits.find((h) => h.id === req.params.id);
  if (!unit) {
    res.status(404).json({ message: "HVAC unit not found." });
    return;
  }
  res.json({ data: unit });
};

module.exports = { getAllHvac, getHvacById };


const { store } = require("../services/store");

const getAlerts = (req, res) => {
  const severity = req.query.severity ? req.query.severity.toString() : undefined;
  const data = severity ? store.alerts.filter((a) => a.severity === severity) : store.alerts;
  res.json({ data });
};

module.exports = { getAlerts };


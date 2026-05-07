const errorHandler = (err, _req, res, _next) => {
  res.status(500).json({ message: (err && err.message) || "Unexpected server error." });
};

module.exports = { errorHandler };


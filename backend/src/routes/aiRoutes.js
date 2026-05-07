const express = require("express");
const { analyzeHvac } = require("../controllers/aiController");

const router = express.Router();
router.post("/analyze", analyzeHvac);

module.exports = router;


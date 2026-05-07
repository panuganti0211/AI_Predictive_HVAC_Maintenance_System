const express = require("express");
const { getAllHvac, getHvacById } = require("../controllers/hvacController");

const router = express.Router();
router.get("/", getAllHvac);
router.get("/:id", getHvacById);

module.exports = router;


const express = require('express');
const axios = require("axios");
const router = express.Router();
const controller = require('./controller')

router.get("/:code", controller.importLeague)
router.get("/reset/all", controller.reset)

module.exports = router;
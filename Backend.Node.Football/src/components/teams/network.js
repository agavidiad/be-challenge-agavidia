const express = require('express');
const router = express.Router();
const controller = require('./controller');
router.get("/:name/:players?", controller.getTeams)

module.exports = router;
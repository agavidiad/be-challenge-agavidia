const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.get("/:code", controller.importLeague)
router.get("/get/all/:quantity?", controller.importAllCompetitions)
router.get("/reset/all", controller.reset)

module.exports = router;
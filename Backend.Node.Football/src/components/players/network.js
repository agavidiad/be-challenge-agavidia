const express = require('express')
const router = express.Router()
const controller = require('./controller')


router.get("/teams/:id/players", controller.getPlayersByTeamId)
router.get("/:code/:filter?", controller.getPlayers)



module.exports = router;
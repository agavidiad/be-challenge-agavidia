const express = require('express');
const router = express.Router();
const controller = require('./controller');
router.get("/:name/:players?", async (req, res) => {
    try {
        const name = req.params.name
        const players = req.params.players == undefined ? req.params.players : req.params.players.toUpperCase()
        await controller.getTeams(name, players).then((response) => {
            if (parseInt(response.length) == 0) {
                res.status(500).json({status: 500, error: 'Código o filtro no existe'})
            } else {
                res.status(200).json(response)
            }           
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "something bad has occurred." })
    }
})

module.exports = router;
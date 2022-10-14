const express = require('express');
const router = express.Router();
const controller = require('./controller');
router.get("/:code/:playerName?", async (req, res) => {
    try {
        const code = req.params.code.toUpperCase()
        const playerName = req.params.playerName == undefined ? req.params.playerName : req.params.playerName.toUpperCase()
        await controller.getPlayers(code, playerName).then((response) => {
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
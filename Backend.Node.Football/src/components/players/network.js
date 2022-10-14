const express = require('express')
const router = express.Router()
const controller = require('./controller')


router.get("/teams/:id/players", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await controller.getPlayersByTeamId(id).then((response) => {
            if (parseInt(response.length) == 0) {
                res.status(500).json({ status: 500, error: 'Id team does not exist' })
            } else {
                res.status(200).json(response)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "something bad has occurred." })
    }
})
router.get("/:code/:filter?", async (req, res) => {
    try {
        const code = req.params.code.toUpperCase()
        const filter = req.params.filter == undefined ? req.params.filter : req.params.filter.toUpperCase()
        console.log(filter)
        await controller.getPlayers(code, filter).then((response) => {
            if (parseInt(response.length) == 0) {
                res.status(500).json({ status: 500, error: 'Código filtro no existe' })
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
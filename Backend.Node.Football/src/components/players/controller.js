const storePlayer = require("./store")

const getPlayers = async (req, res) => {
    try {
        const code = req.params.code.toUpperCase()
        const filter = req.params.filter == undefined ? req.params.filter : req.params.filter.toUpperCase()
        await storePlayer.getPlayers(code, filter).then((response) => {            
            response.length == 0 ? res.status(500).send({ status: 500, error: 'Código o filtro no existe' }) : res.status(200).send(response)
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "something bad has occurred." })
    }
}

const getPlayersByTeamId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await storePlayer.getPlayersByTeamId(id).then((response) => {
            if (parseInt(response.length) == 0) {
                res.status(500).send({ status: 500, error: 'Id team does not exist' })
            } else {
                res.status(200).send(response)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "something bad has occurred." })
    }
}




module.exports = { getPlayers, getPlayersByTeamId }
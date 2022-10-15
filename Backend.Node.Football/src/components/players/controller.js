const storePlayer = require("./store")
const boom = require('@hapi/boom')
const getPlayers = async (req, res, next) => {
    try {
        const code = req.params.code.toUpperCase()
        const filter = req.params.filter == undefined ? req.params.filter : req.params.filter.toUpperCase()
        await storePlayer.getPlayers(code, filter).then((response) => {
            response.length == 0 ? res.status(500).send({ status: 500, error: 'Código o filtro no existe' }) : res.status(200).send(response)
        })
    } catch (err) {
        next(err)
    }
}

const getPlayersByTeamId = async (req, res, next) => {
    try {
        const id = req.params.id
        await storePlayer.getPlayersByTeamId(id).then((response) => {
            if (response.length == 0) {
                throw boom.notFound('Id team does not exist')
            }
            res.status(200).send(response)
        })
    } catch (err) {
        next(err)
    }
}




module.exports = { getPlayers, getPlayersByTeamId }
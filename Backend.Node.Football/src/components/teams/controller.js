const store = require("./store")
const boom = require('@hapi/boom')

const getTeams = async (req, res, next) => {
    try {
        const name = req.params.name
        const players = req.params.players == undefined ? req.params.players : req.params.players.toUpperCase()
        let result = {}
        players == undefined ? result = await store.getTeamsByName(name) : result = await store.getTeamsByNameAndPlayers(name)
        if (result.length == 0) {
            throw boom.notFound('Código o filtro no existe')
        }
        res.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

module.exports = { getTeams }
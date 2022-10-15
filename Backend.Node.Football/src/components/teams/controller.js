const store = require("./store")

const getTeams = async (req, res) => {
    try {
        const name = req.params.name
        const players = req.params.players == undefined ? req.params.players : req.params.players.toUpperCase()
        let result = {}
        players == undefined ? result = await store.getTeamsByName(name) : result = await store.getTeamsByNameAndPlayers(name)
        result.length == 0 ? res.status(500).send({ status: 500, error: 'Código o filtro no existe' }) : res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "something bad has occurred." })
    }
}

module.exports = { getTeams }
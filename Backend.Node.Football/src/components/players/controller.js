const storePlayer = require("./store")

const getPlayers = async (code, filter) => {
    return storePlayer.players(code, filter)
}

const getPlayersByTeamId = async (id) => {
    return storePlayer.getPlayersByTeamId(id)
}


module.exports = { getPlayers, getPlayersByTeamId }
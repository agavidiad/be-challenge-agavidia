const storePlayer = require("./store")

const getPlayers = async (code, teamName) => {
    return storePlayer.players(code, teamName)
}

module.exports = { getPlayers }
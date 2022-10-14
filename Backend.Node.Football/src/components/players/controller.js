const storePlayer = require("../players/store")

const getPlayers = async (code, playerName) => {
    return storePlayer.players(code, playerName)
}

module.exports = { getPlayers }
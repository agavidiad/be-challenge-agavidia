const store = require("./store")

const getTeams = async (teamName, players) => {
    if (players == undefined) {
        return store.getTeamsByName(teamName)
    } else {
        return store.getTeamsByNameAndPlayers(teamName)
    }
}

module.exports = { getTeams }
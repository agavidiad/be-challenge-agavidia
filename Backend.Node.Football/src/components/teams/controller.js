const store = require("./store")

const getTeams = async (teamName, players) => {
    if (players == undefined) {
        console.log('call getTeamsByName')
        return store.getTeamsByName(teamName)
    } else {
        console.log('call getTeamsByNameAndPlayers')
        return store.getTeamsByNameAndPlayers(teamName)
    }
}

module.exports = { getTeams }
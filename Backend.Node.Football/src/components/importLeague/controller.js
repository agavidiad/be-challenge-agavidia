const axios = require("axios");
const storeCompetition = require("../competitions/store")
const storeTeam = require("../teams/store")
const storePlayer = require("../players/store")
const storeCoach = require("../coaches/store")

const importLeague = async (code) => {
    // Does it exist in the local database?
    const exist = await storeCompetition.getCompetitionByCode(code)
    let idCompetition = 0
    let result = {}
    // console.log(exist)
    if (exist == undefined || exist.length === 0) {
        // Call REST API by Axios and insert DB
        await axios.get(`${process.env.FOOTBALL_DATA_URL}/competitions/${code}/`, {
            headers: {
                'X-Auth-Token': `${process.env.TOKEN}`
            }
        }).then((response) => {
            idCompetition = response.data.id
            storeCompetition.insertCompetition({
                id: idCompetition,
                code: response.data.code,
                name: response.data.name,
                areaName: response.data.area.name
            })
            result = saveAll(idCompetition, code)
        }).catch((error) => {
            if (error.response) {
                if (parseInt(error.response.status) == 400) {
                    result = { status: 400, message: 'No existe el código de Competition' }
                }
            }
        })
    } else {
        idCompetition = exist.id
        // console.log('competition ID ' + idCompetition)
        result = await saveAll(idCompetition, code)
        // result = { status: 201, message: 'Competition exists -updated teams, players and coaches' }
    }

    return { result }
}

const saveAll = async (idCompetition, code) => {
    let result = {}
    // Call REST API by Axios and insert DB
    await axios.get(`${process.env.FOOTBALL_DATA_URL}/competitions/${code}/teams`, {
        headers: {
            'X-Auth-Token': `${process.env.TOKEN}`
        }
    }).then((response) => {
        const teams = response.data.teams
        teams.forEach(team => {
            // Does it exist the team in the local database ?     
            let idTeam = team.id
            storeTeam.existTeamById(idTeam).then((response) => {
                if (parseInt(response.Count) == 0) {
                    storeTeam.insertTeam({ idCompetition, team }).then((response) => {

                    }).catch((error) => {
                        //revertir
                    })
                    // console.log('cantidad de jugadores: ' + team.squad.length)

                    if (parseInt(team.squad.length) == 0) {
                        // insert coach
                        storeCoach.insertCoach({ idTeam, coach: team.coach })
                        result = { status: 200, message: 'OK' }

                    } else {
                        team.squad.forEach(player => {
                            storePlayer.existPlayerById(player.id).then((response) => {
                                if (parseInt(response.Count) == 0) {
                                    storePlayer.insertPlayer({ idTeam: idTeam, player: player }).then((response) => {
                                        result = { status: 200, message: 'OK' }
                                    }).catch((error) => {
                                        //revertir
                                    })
                                }
                            })
                        })
                    }
                } else {
                    // just update - optional
                }
            }).catch((error) => {
                //revertir
            })
        })
    }).catch((error) => {
        if (error.response) {
            if (parseInt(error.response.status) == 400) {
                result = { status: 400, message: 'No existe el código de Competition _____' }
            }
        }
    })
    return result
}

module.exports = { importLeague }
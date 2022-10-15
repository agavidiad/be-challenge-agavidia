const axios = require("axios");
const storeCompetition = require("../competitions/store")
const storeTeam = require("../teams/store")
const storePlayer = require("../players/store")
const storeCoach = require("../coaches/store")
const controller = require('./store')

const importLeague = async (req, res) => {
    try {
        const code = req.params.code.toUpperCase()
        let idCompetition = 0
        let flag = true
        // Does the competition exist in the local database?
        const exist = await storeCompetition.getCompetitionByCode(code)
        if (exist == undefined || exist.length === 0) {
            // Call REST API by Axios and insert DB
            await axios.get(`${process.env.FOOTBALL_DATA_URL}/competitions/${code}/`, {
                headers: {
                    'X-Auth-Token': `${process.env.TOKEN}`
                }
            }).then((response) => {
                idCompetition = response.data.id
                // Save competition locally
                storeCompetition.insertCompetition({
                    id: idCompetition,
                    code: response.data.code,
                    name: response.data.name,
                    areaName: response.data.area.name
                })
            }).catch((error) => {
                if (error.response) {
                    const status = error.response.status
                    if (status == 404 || status == 400) {
                        flag = false
                        res.status(status).send({ status: status, message: 'No existe el código de Competition' })
                    }
                }
            })
        }
        flag ? res.status(200).send(await saveAll(idCompetition, code)) : console.log('')
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "something bad has occurred." })
    }
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
            // Does the team exist in the local database?
            let idTeam = team.id
            storeTeam.existTeamById(idTeam).then((response) => {
                if (response.Count == 0) {
                    storeTeam.insertTeam({ idCompetition, team }).then((response) => {
                    }).catch((error) => {//revertir
                    })
                    // There is not players
                    if (team.squad.length == 0) {
                        // Insert coach
                        storeCoach.insertCoach({ idTeam, coach: team.coach })
                    } else {
                        // Insert players
                        team.squad.forEach(player => {
                            storePlayer.existPlayerById(player.id).then((response) => {
                                if (response.Count == 0) {
                                    console.log('no existe jugador insertar')
                                    storePlayer.insertPlayer({ idTeam: idTeam, player: player }).then((response) => {
                                    }).catch((error) => {//revertir
                                    })
                                }
                            })
                        })
                    }
                } else {
                    // just update - optional
                }
            }).catch((error) => {//revertir
            })
        })
        result = { status: 200, message: 'OK' }
    }).catch((error) => {
        if (error.response) {
            if (error.response.status == 400 || error.response.status == 404) {
                result = { status: error.response.status, message: 'No existe el código de Competition' }
            }
        }
    })
    return result
}

const reset = async (req, res) => {
    try {
        await controller.reset().then((response) => {
            res.status(200).send({ status: 200, message: 'Se reseteó la base de datos local' })
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "something bad has occurred." })
    }
}


module.exports = { importLeague, reset }
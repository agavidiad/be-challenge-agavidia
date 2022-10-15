const axios = require("axios");
const { getAllCompetitionsAPI } = require('../competitions/controller')
const storeCompetition = require("../competitions/store")
const storeTeam = require("../teams/store")
const storePlayer = require("../players/store")
const storeCoach = require("../coaches/store")
const store = require('./store')
const boom = require('@hapi/boom')

const importLeague = async (req, res, next) => {
    try {
        const code = req.params.code.toUpperCase()
        const idCompetition = await saveCompetition(code)
        res.status(200).send(await saveDetails(idCompetition, code))
    } catch (err) {
        next(err)
    }
}

const importAllCompetitions = async (req, res, next) => {
    try {
        // console.log(4%5)
        // return
        const quantity = req.params.quantity != undefined ? parseInt(req.params.quantity) : 1
        const competitions = await getAllCompetitionsAPI(quantity)
        let cont = 1
        for await (const competition of competitions) {
            if (cont % 6 === 0) {
                await new Promise(resolve => setTimeout(resolve, 60000))
            }
            const idCompetition = await saveCompetition(competition.code)
            await saveDetails(idCompetition, competition.code)
            console.log(cont % 6)
            cont++
        }
        res.status(200).send({ status: 200, message: `Se importaron ${quantity} ligas/competitions` })
    } catch (error) {
        next(error)
    }
}

const saveCompetition = async (code) => {
    try {
        let idCompetition = 0
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
            }).catch(() => {
                throw boom.notFound('No existe el código')
            })
        }
        return idCompetition
    } catch (error) {
        throw boom.boomify(error)
    }
}
const saveDetails = async (idCompetition, code) => {
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
        throw boom.notFound('Teams: No existe el código ')
    })
    return result
}

const reset = async (req, res, next) => {
    try {
        await store.reset().then((response) => {
            res.status(200).send({ status: 200, message: 'Se reseteó la base de datos local' })
        })
    } catch (err) {
        next(err)
    }
}


module.exports = { importLeague, reset, importAllCompetitions }
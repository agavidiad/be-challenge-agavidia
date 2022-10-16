const axios = require("axios");
const boom = require('@hapi/boom')

const getAllCompetitionsAPI = async (quantity) => {
    try {
        const result = await axios.get(`${process.env.FOOTBALL_DATA_URL}/competitions`, {
            headers: {
                'X-Auth-Token': `${process.env.TOKEN}`
            }
        })
        quantity = quantity != undefined ? parseInt(quantity) : result.data.competitions.lenght
        return result.data.competitions.slice(0, quantity)
    } catch (error) {
        throw boom.boomify(error)
    }
}

module.exports = { getAllCompetitionsAPI }
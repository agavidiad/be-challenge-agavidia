const { poolPromise, sql } = require('../../util/mssql')
const boom = require('@hapi/boom')
const store = {};

store.reset = async () => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(`
            delete from dbo.CompetitionTeams;
            delete from dbo.Teams;
            delete from dbo.Coaches;
            delete from dbo.Players;
            delete from dbo.Competitions;`)
        return result.recordset
    } catch (error) {
        throw boom.boomify(error)
    }
}
module.exports = store;
const { poolPromise, sql } = require('../../util/mssql')
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
        console.log(error)
        throw new Error(error)
    }
}
module.exports = store;
const { poolPromise, sql } = require('../../util/mssql')
const storeCompetition = {};

storeCompetition.getCompetitionByCode = async (code) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('code', sql.VarChar, code.toUpperCase())
            .query(`select * from dbo.competitions where UPPER(code)=@code`)
        return await result.recordset[0]
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
storeCompetition.insertCompetition = async ({ id, code, name, areaName }) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('code', sql.VarChar, code)
            .input('name', sql.VarChar, name)
            .input('areaName', sql.VarChar, areaName)
            .query(`INSERT INTO dbo.Competitions (id, code, name, areaName, createdAt, updatedAt)
                        VALUES
                    (@id, @code, @name, @areaName, getdate(), getdate())`)
        return await result.recordset
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
};


module.exports = storeCompetition;

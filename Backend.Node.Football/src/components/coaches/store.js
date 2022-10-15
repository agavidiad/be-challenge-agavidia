const { poolPromise, sql } = require('../../util/mssql')
const boom = require('@hapi/boom')
const storeCoach = {};
storeCoach.existCoachById = async (idTeam, id) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('idTeam', sql.Int, idTeam)
            .query(`select count(*) as [Count] from dbo.Coaches where idTeam=@idTeam AND id=@id`)
        return await result.recordset[0]
    } catch (error) {
        throw boom.boomify(error)
    }
}
storeCoach.insertCoach = async ({ idTeam, coach }) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('idTeam', sql.Int, idTeam)
            .input('id', sql.Int, coach.id == undefined || coach.id == null ? 0 : coach.id)
            .input('name', sql.VarChar, coach.name)
            .input('dateOfBirth', sql.DateTime, coach.dateOfBirth)
            .input('nationality', sql.VarChar, coach.nationality)
            .query(`insert into dbo.Coaches (idTeam,id,name,dateOfBirth,nationality,createdAt,updatedAt) 
                values (@idTeam,@id,@name,@dateOfBirth,@nationality,GETDATE(),GETDATE())`)
        return result.recordset
    } catch (error) {
        throw boom.boomify(error)
    }
}

module.exports = storeCoach;

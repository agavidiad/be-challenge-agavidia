
const { poolPromise, sql } = require('../../util/mssql')
const boom = require('@hapi/boom')
const storeTeam = {};
storeTeam.existTeamById = async (id) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`select count(*) as [Count] from dbo.CompetitionTeams where idTeam=@id`)
        return await result.recordset[0]
    } catch (error) {
        throw boom.boomify(error)
    }
}

storeTeam.insertTeam = async ({ idCompetition, team }) => {

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('idCompetition', sql.Int, idCompetition)
            .input('id', sql.Int, team.id)
            .input('name', sql.VarChar, team.name)
            .input('shortName', sql.VarChar, team.shortName)
            .input('areaName', sql.VarChar, team.area.name)
            .input('address', sql.VarChar, team.address)
            .query(`insert into dbo.Teams (idCompetition,id,name,shortName,areaName,address,createdAt,updatedAt) 
                values (@idCompetition,@id,@name,@shortName,@areaName,@address,GETDATE(),GETDATE())`)

        await insertCompetitionTeam(idCompetition, team.id)
        return result.recordset
    } catch (error) {
        throw boom.boomify(error)
    }
}

storeTeam.getTeamsByName = async (teamName) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .query(`select * from dbo.Teams
            WHERE name like '%${teamName}%' 
            ORDER BY name`)
        return await result.recordset
    } catch (error) {
        throw boom.boomify(error)
    }
}

storeTeam.getTeamsByNameAndPlayers = async (teamName) => {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(`select t.id, t.name, t.shortName, t.address,
                pl.name as playerName, pl.position ,pl.dateOfBirth as playerDateOfBirth, pl.nationality as playerNationality
                 ,c.name as coachName, c.dateOfBirth as coachDateOfBirth, c.nationality as coachNationality
                from dbo.Teams T
                LEFT JOIN dbo.Players pl  on pl.idTeam = t.id
                LEFT JOIN dbo.Coaches c on t.id = c.idTeam
                WHERE UPPER(t.name) like '%${teamName}%'
                ORDER BY T.name, pl.name `)
            return await result.recordset
        } catch (error) {
            throw boom.boomify(error)
        }
    }

const insertCompetitionTeam = async (idCompetition, idTeam) => {

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('idCompetition', sql.Int, idCompetition)
            .input('idTeam', sql.Int, idTeam)
            .query(`insert into dbo.CompetitionTeams (idCompetition,idTeam,idStatus,createdAt,updatedAt) 
                values (@idCompetition,@idTeam,1,GETDATE(),GETDATE())`)
        return result.recordset
    } catch (error) {
        throw boom.boomify(error)
    }
}

// storeTeam.insertCompetitionTeam

module.exports = storeTeam;

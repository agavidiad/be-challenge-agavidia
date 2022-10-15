const { poolPromise, sql } = require('../../util/mssql')
const storePlayer = {};
storePlayer.existPlayerById = async (id) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`select count(*) as [Count] from dbo.Players where id=@id`)
        return await result.recordset[0]
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

storePlayer.getPlayers = async (code, filter) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('code', sql.VarChar, code)
            .query(`select pl.idTeam, pl.id, pl.name ,pl.position ,pl.dateOfBirth, pl.nationality, T.name as sTeamName 
            from dbo.Players pl 
            INNER JOIN dbo.Teams t on pl.idTeam = t.id
            INNER JOIN dbo.Competitions c ON t.idCompetition = c.id
            WHERE C.code = @code
            ${filter != null && filter.length > 0 ? ` AND UPPER(t.name) LIKE '%${filter}%'` : ''}
            ${filter != null && filter.length > 0 ? ` OR UPPER(pl.name) LIKE '%${filter}%'` : ''}
            ORDER BY T.name, pl.name `)
        return await result.recordset
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

storePlayer.getPlayersByTeamId = async (id) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`select t.id, t.name, t.shortName, t.address,
            pl.name as playerName, pl.position ,pl.dateOfBirth as playerDateOfBirth, pl.nationality as playerNationality
             ,c.name as coachName, c.dateOfBirth as coachDateOfBirth, c.nationality as coachNationality
            from dbo.Teams T
            LEFT JOIN dbo.Players pl  on pl.idTeam = t.id
            LEFT JOIN dbo.Coaches c on t.id = c.idTeam
            WHERE t.id = @id
            ORDER BY pl.name `)
        return await result.recordset
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

storePlayer.insertPlayer = async ({ idTeam, player }) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('idTeam', sql.Int, idTeam)
            .input('id', sql.Int, player.id)
            .input('name', sql.VarChar, player.name)
            .input('position', sql.VarChar, player.position)
            .input('dateOfBirth', sql.DateTime, player.dateOfBirth)
            .input('nationality', sql.VarChar, player.nationality)
            .query(`
            IF NOT EXISTS(select * from dbo.Players where id = @id)
            BEGIN
                insert into dbo.Players (idTeam,id,name,position,dateOfBirth,nationality,createdAt,updatedAt) 
                values (@idTeam,@id,@name,@position,@dateOfBirth,@nationality,GETDATE(),GETDATE())
            END `)
        return result.recordset
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = storePlayer;

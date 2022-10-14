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

storePlayer.players = async (code, playerName) => {
    try {      
        console.log(playerName)
        const pool = await poolPromise
        const result = await pool.request()
            .input('code', sql.VarChar, code)
            .query(`select pl.idTeam, pl.id, pl.name ,pl.position ,pl.dateOfBirth, pl.nationality, T.name as TeamName 
            from dbo.Players pl 
            INNER JOIN dbo.Teams t on pl.idTeam = t.id
            INNER JOIN dbo.Competitions c ON t.idCompetition = c.id
            WHERE C.code = @code 
            ${playerName != null && playerName.length ? ` AND t.name LIKE '%${playerName}%'` :''}
            ORDER BY T.name, pl.name `)
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
            .query(`insert into dbo.Players (idTeam,id,name,position,dateOfBirth,nationality,createdAt,updatedAt) 
                values (@idTeam,@id,@name,@position,@dateOfBirth,@nationality,GETDATE(),GETDATE())`)
        return result.recordset
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = storePlayer;

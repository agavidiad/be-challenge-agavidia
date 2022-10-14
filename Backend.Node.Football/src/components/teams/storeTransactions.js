// const { poolPromise, sql } = require('../../util/mssql')
// const storeTeam = {};

// storeTeam.existTeamById = async (id) => {
//     try {
//         const pool = await poolPromise
//         const result = await pool.request()
//             .input('id', sql.Int, id)
//             .query(`select count(*) as [Count] from dbo.CompetitionTeams where idTeam=@id`)
//         return await result.recordset[0]
//     } catch (error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }
// storeTeam.insertTeamPlayerCoach = async ({ idCompetition, teams }) => {
//     try {
//         const pool = await poolPromise
//         const transaction = new sql.Transaction(pool)
//         const request = await pool.request(transaction)
//         await transaction.begin(err => {
//             // ... error checks
//             teams.forEach(team => {
//                 const request = new sql.Request(transaction)                
//                 request.input('idCompetition', sql.Int, idCompetition)
//                     .input('id', sql.Int, team.id)
//                     .input('name', sql.VarChar, team.name)
//                     .input('shortName', sql.VarChar, team.shortName)
//                     .input('areaName', sql.VarChar, team.area.name)
//                     .input('address', sql.VarChar, team.address)
//                     .query(`insert into dbo.Teams (idCompetition,id,name,shortName,areaName,address,createdAt,updatedAt) 
//                         values (@idCompetition,@id,@name,@shortName,@areaName,@address,GETDATE(),GETDATE())`, (err, result) => {
//                         // ... error checks
//                         console.log(err)
//                         transaction.commit(err => {
//                             // ... error checks
//                             console.log("Transaction committed.")
//                         })
//                     })

//             })

//         })
//     } catch (error) {
//         console.log(error)
//         throw new Error(error)
//     }
// };


// module.exports = storeTeam;

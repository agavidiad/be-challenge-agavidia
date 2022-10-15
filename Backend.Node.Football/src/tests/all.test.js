const boom = require('@hapi/boom')
const { getAllCompetitionsAPI } = require('../components/competitions/controller')

test('getAllCompetitions', async () => {
    let count = 0
    expect(count).toBe(0)
})
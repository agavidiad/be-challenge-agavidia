
const express = require("express");
const importLeague = require('../components/importLeague/network')
const players = require('../components/players/network')
const teams = require('../components/teams/network')
const routes = function (server) {
    server.use('/importLeague', importLeague)
    server.use('/players', players)
    server.use('/teams', teams)
}

module.exports = routes;

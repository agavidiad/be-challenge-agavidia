
const express = require("express");

const importLeague = require('../components/importLeague/network')
const routes = function (server) {
    server.use('/importLeague', importLeague)
    // server.use('/token', token)
    // server.use('/payments', payments)
    // server.use('/users', users)
}

module.exports = routes;
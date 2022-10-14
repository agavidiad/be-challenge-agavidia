const express = require('express');
const axios = require("axios");
const router = express.Router();
const controller = require('./controller');
router.get("/:code", async (req, res) => {
    try {
        const code = req.params.code.toUpperCase()
        await controller.importLeague(code).then((response) => {
            res.status(200).json(response)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "something bad has occurred." })
    }
})

router.get("/reset/all", async (req, res) => {
    try {

        await controller.reset().then((response) => {
            res.status(200).json({ status: 200, message: 'Se reseteó la base de datos local' })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "something bad has occurred." })
    }
})

module.exports = router;
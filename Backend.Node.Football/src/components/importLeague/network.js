const express = require('express');
const axios = require("axios");
const router = express.Router();
const controller = require('./controller');
router.get("/:code", async (req, res) => {
    try {
        const code = req.params.code
        await controller.importLeague(code).then((response) => {
            res.status(200).json(response)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "something bad has occurred." })
    }
})

module.exports = router;
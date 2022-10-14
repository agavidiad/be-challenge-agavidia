const express = require('express');
const app = express();
require('dotenv').config()
const router = require('./src/network/routes')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
router(app)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`app is listening on : http://localhost:${port}`)
)
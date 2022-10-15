const express = require('express');
const app = express();
require('dotenv').config()
const { logErrors, errorHandler, boomErrorHandler } = require('./src/middleware/error.handler')
const router = require('./src/network/routes')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
router(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`app is listening on : http://localhost:${port}`)
)
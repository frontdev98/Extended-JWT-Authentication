const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
require('dotenv').config();

async function App() {
    const app = express();

    try {
        app.listen(process.env.PORT, () => {
            logger.info(`Server started on ${process.env.PORT} port.`)
        })

    } catch (e) {
        logger.error(`Server error: ${e.message}`)
    }
}

App();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware')
require('dotenv').config();

async function App() {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use('/api', router);
    app.use(errorMiddleware);

    try {
        app.listen(process.env.PORT, () => {
            logger.info(`Server started on ${process.env.PORT} port.`)
        })

    } catch (e) {
        logger.error(`Server error: ${e.message}`)
    }
}

App();
/*
    Logger for info and error messages.
    Store logs to file.
    Store logs also to console if NODE_ENV='dev'
*/
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    defaultMeta: {'service': 'extended-jwt'},
    format: format.json(),
    transports: [
        // new transports.File({
        //     filename: process.env.LOG_PATH
        // })
        new transports.Console({
            format: format.simple()
        })
    ]
});

// if (process.env.NODE_ENV === 'dev') {
//     logger.add(new transports.Console({
//         format: format.simple()
//     }));
// }

module.exports = logger;
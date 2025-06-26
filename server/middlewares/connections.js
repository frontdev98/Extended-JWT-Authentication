const logger = require('../logger')

module.exports = function(req, res, next)  {
    logger.info(`${req.ip} ${req.method} ${req.path}`)
    next()
}
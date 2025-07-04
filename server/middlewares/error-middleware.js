const logger = require('../logger')
const ApiError = require('../exceptions/api-error')

module.exports = function(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    console.log(err.message);

    return res.status(500).json({message: 'Server error'})
}
const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

module.exports = function (req, res, next) {
    try {

        // 1. Get header "Authorization"
        const authorizationheader = req.headers.authorization

        if (!authorizationheader) {
            return next(ApiError.UnauthorizedError())
        }

        // 2. Pull token out from the header
        const accessToken = authorizationheader.split(' ')[1]

        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        // 3. Validate access token with tokenService
        const userData = tokenService.validateAccessToken(accessToken)

        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()

    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
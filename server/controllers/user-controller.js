const { PrismaClient } = require('../generated/prisma/client')
const userService = require('../services/user-service')
const {validationResult} = require('express-validator')
const logger = require('../logger')
const ApiError = require('../exceptions/api-error')

const client = new PrismaClient();

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error.', errors.array()))
            }

            const {email, password} = req.body
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,   // max age is 15 days
                httpOnly: true                      // don't allow getting this cookie with js
                // secure: true                     // if you use https
            })

            return res.json(userData)

        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL);

        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await client.userModel.findMany();
            logger.info(`Requested userlist: ${users}`);
            return res.json(users);

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
const { PrismaClient } = require('../generated/prisma/client')
const userService = require('../services/user-service')
const logger = require('../logger')

const client = new PrismaClient();

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,   // max age is 15 days
                httpOnly: true                      // don't allow getting this cookie with js
                // secure: true                     // if you use https
            })

            return res.json(userData)

        } catch (e) {
            logger.error(e.message)
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            
        }
    }

    async activate(req, res, next) {
        try {

        } catch (e) {
            
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await client.userModel.findMany();
            logger.info(`Requested userlist: ${users}`);
            return res.json(users);

        } catch (e) {
            logger.error(e.message);
        }
    }
}

module.exports = new UserController();
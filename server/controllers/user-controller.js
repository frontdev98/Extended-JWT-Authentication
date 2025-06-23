const { PrismaClient } = require('../generated/prisma/client')
const logger = require('../logger')

const client = new PrismaClient();

class UserController {
    async registration(req, res, next) {
        try {
    
        } catch (e) {

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
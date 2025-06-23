const { PrismaClient } = require('../generated/prisma/client')
const bcrypt = require('bcrypt')
const uuid   = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const logger = require('../logger');

const client = new PrismaClient()

class UserService {
    async registration(email, password) {
        const candidate = await client.userModel.findUnique({
            where: {
                email
            }
        })

        if (candidate !== null) {
            throw new Error(`User with email ${email} already exists.`)
        }

        // hash password 
        const passwordHash = await bcrypt.hashSync(password, 3);

        // create activation link
        const activationLink = uuid.v4()

        // create user
        const user = await client.userModel.create({
            data: {
                email,
                activationLink,
                password: passwordHash,
            }
        })

        // send activation link to pointed email
        await mailService.sendActivationMail(email, 
            `${process.env.API_URL}/api/activate/${activationLink}`)

        // generate token based on data of the user
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        const savedTokens = await tokenService.saveToken(userDto.id, tokens.refreshToken)

        logger.info(`Create user ${email} with tokens ${savedTokens}`)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await client.userModel.findFirst({
            where: {
                activationLink
            }
        })

        if (user === null) {
            throw new Error("Incorrect activation link.")
        }

        await client.userModel.update({
            where: {
                id: user.id
            },
            data: {
                isActivated: true
            }
        })
    }
}

module.exports = new UserService();
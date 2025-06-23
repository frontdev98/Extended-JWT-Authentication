const { PrismaClient } = require('../generated/prisma/client')
const bcrypt = require('bcrypt')
const uuid   = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const logger = require('../logger')
const ApiError = require('../exceptions/api-error')

const client = new PrismaClient()

class UserService {
    async registration(email, password) {
        const candidate = await client.userModel.findUnique({
            where: {
                email
            }
        })

        if (candidate !== null) {
            throw ApiError.BadRequest(`User with email ${email} already exists.`)
        }

        // hash password 
        const passwordHash = await bcrypt.hash(password, 3);

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
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await client.userModel.findFirst({
            where: {
                activationLink
            }
        })

        if (user === null) {
            throw ApiError.BadRequest("Incorrect activation link.")
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

    async login(email, password) {
        const user = await client.userModel.findFirst({
            where: {
                email: email
            }
        })

        if (user === null) {
            throw ApiError.BadRequest("Wrong email or password.")
        }

        const isCompaired = await bcrypt.compare(password, user.password)

        if (!isCompaired) {
            throw ApiError.BadRequest("Wrong email or password.")
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();
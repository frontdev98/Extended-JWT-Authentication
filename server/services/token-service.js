const jwt = require('jsonwebtoken')
const { PrismaClient } = require('../generated/prisma/client');
const ApiError = require('../exceptions/api-error');

const client = new PrismaClient();

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload, 
            process.env.JWT_ACCESS_SECRET, 
            {expiresIn: '15m'}
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '15d'}
        );
        return {
            accessToken, 
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await client.tokenModel.upsert({
            where: {
                userModelId: userId
            },
            update: {               // update token if it exists
                refreshToken
            },
            create: {               // create token otherwise
                refreshToken,
                userModelId: userId
            }
        })

        return tokenData;
    }

    async removeToken(refreshToken) {
        const tokenData = await client.tokenModel.findFirst({
            where: {
                refreshToken
            }
        })

        if (!tokenData) {
            return null
        }

        return await client.tokenModel.delete({
            where: {
                id: tokenData.id
            }
        })
    }
}

module.exports = new TokenService();
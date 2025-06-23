const jwt = require('jsonwebtoken')
const { PrismaClient } = require('../generated/prisma/client')

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
}

module.exports = new TokenService();
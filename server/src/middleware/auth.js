const jwt = require('jsonwebtoken');
const User = require('../db/models/User')

const Auth = {
    async verifyUserToken(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).json({'message': 'Token is not provided'});
        }
        try {
            const decoded = await jwt.verify(token, 'secret123123');
            if (!decoded.email) {
                return res.status(400).json({'message': 'The token you provided is invalid'});
            }
            req.decoded = decoded;
            next();
        }catch (e) {
           return res.status(400).json(e);
        }
    },

    async verifyAdmin(req, res, next){
        if(!req.decoded.role || req.decoded.role != 'ADMIN'){
            return res.status(400).json({'message': 'Not authorized. Only admins.'});
        }else{
            next();
        }
    }
}

module.exports = Auth;


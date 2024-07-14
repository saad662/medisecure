const jwt = require('jsonwebtoken');
const Distributors = require('../models/Distributors').Distributors;
const Productions = require('../models/Productions').Productions;

const DistributorVerifyToken = function(req, res, next) {
    let token = req.headers.authorization;

    if(token) {
        token = token.replace('Bearer ', '')

        jwt.verify(token, 'distributors', async (err, decode) => {
            if (err) {
                res.send({message: 'Invalid Authorization',err})
            } else {
                console.log('decode ===>', decode);
                const tokenExist = await Distributors.findOne({_id: decode._id, token});
                if(tokenExist) {
                    next();
                } else {
                    res.send({message: 'Invalid Authorization',err:'doesnot exist'})
                }
            }
        })
    } else {
        res.send({message: 'Invalid Authorization'})
    }
    
}
const ProductionVerifyToken =  function(req, res, next) {
    let token = req.headers.authorization;

    if(token) {
        token = token.replace('Bearer ', '')

        jwt.verify(token, 'productions', async (err, decode) => {
            if (err) {
                res.send({message: 'Invalid Authorization',err})
            } else {
                console.log('decode ===>', decode);
                const tokenExist = await Productions.findOne({_id: decode._id, token});
                if(tokenExist) {
                    next();
                } else {
                    res.send({message: 'Invalid Authorization',err:'doesnot exist'})
                }
            }
        })
    } else {
        res.send({message: 'Invalid Authorization'})
    }
    
}

module.exports = {
    DistributorVerifyToken,
    ProductionVerifyToken
};
const jwt = require('jsonwebtoken')
const jwtKey = process.env.SECRET_KEY || 'secret'

module.exports =( req, res, next) =>{
    try {
        const token =  req.headers.authorization;
        const  decoded = jwt.verify(token,jwtKey)
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({message:"Auth Failed"})
    }
};
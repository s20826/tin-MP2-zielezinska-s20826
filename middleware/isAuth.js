const jwt = require('jsonwebtoken')
const config = require("../config/mysql2/key")

module.exports = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, 'aaaa', (err,user) =>{
        if(err){
            return res.sendStatus(403)
        }
        req.user=user
    })
    next()
}
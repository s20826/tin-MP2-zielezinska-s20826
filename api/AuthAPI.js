const VetRepository = require('../repository/mysql2/vetRepository')
const config = require('../config/mysql2/key')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.login = (req, res)=> {
    const email = req.body.email
    const password = req.body.password

    VetRepository.findByEmail(email)
    .then(user => {
        console.log(user)
        if(!user){
            return res.status(401).send({message: "Nieprawidłowy email lub hałoaaaa"})
        }

        bcrypt.compare(password, user.password)
        
        .then(isEqual => {
            if(!isEqual){
                  return res.status(401).send({message: "Nieprawidłowy email lub hało"})
            }
                const token = jwt.sign({
                    email:user.email,
                    userId:user.idVet
                },
                'aaaa',
                {expiresIn: '1h'}
            )
            res.status(200).json({token:token, userId:user.idVet ,role:user.role})
            
        })
        .catch(err=>{
            console.log(err)
            res.status(501)
        })
    })
    
}
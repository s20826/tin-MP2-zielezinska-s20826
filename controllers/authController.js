const VetRepository = require('../repository/mysql2/vetRepository');
const authUtil = require('../util/authUtils')

exports.login = (req, res, next) => {
    const email = req.body.email;
    const  password = req.body.password;

    VetRepository.findByEmail(email)
        .then(vet => {
            if(!vet){
                res.render('index', {
                    navLocation:'',
                    loginError: req.__('auth.error')
                })
            }
            else if(authUtil.comparePasswords( password, vet.password)=== true){
                req.session.loggedUser = vet;
                res.redirect('/');
            }
            else {
                res.render('index',{
                    navLocation:'',
                    loginError: req.__('auth.error')
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
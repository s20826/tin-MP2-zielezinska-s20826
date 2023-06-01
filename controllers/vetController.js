const VetRepository = require('../repository/mysql2/vetRepository')

exports.showVetList = (req, res, next) => {
    VetRepository.getVets()
        .then(Vet => {
            res.render('pages/vet/v_list', {
                    Vet: Vet,
                    navLocation: 'vet' ,
                    actionBefore: ''
                }
            )
        })
}

exports.showVetForm = (req, res, next) => {
    res.render('pages/vet/v_form', {
        Vet:{},
        formMode: 'add',
        pageTitle: req.__('vet.pages.new'),
        formAction: '../../vets/add',
        navLocation: 'vet',
        actionBefore: '',
        validationErrors:[]

    });
}
exports.addVet = (req, res, next) => {
    const vData={...req.body};
    VetRepository.createVet(vData)
        .then(() => {
            res.redirect('../../vets/afterAdd');

        })
        .catch(err => {
            //res.status(500).json(err);
            res.render('pages/vet/v_form', {
                Vet: vData,
                formMode: 'add',
                pageTitle: req.__('vet.pages.new'),
                formAction: '../../vets/add',
                navLocation: 'vet',
                actionBefore: '',
                validationErrors: err.details
            });

        });
}
exports.showVetEdit = (req, res, next) => {
    const idVet = req.params.idVet;
    VetRepository.getVetById(idVet)
        .then(Vet => {
            res.render('pages/vet/v_form', {
                Vet: Vet,
                formMode: 'edit',
                pageTitle: req.__('vet.pages.edit'),
                formAction: '../../vets/edit',
                navLocation: 'vet',
                actionBefore: '',
                validationErrors: []

            });
        });
}

exports.updateVet = (req, res, next) => {
    const idVet=req.body.idVet;
    const vData={...req.body};
    VetRepository.updateVet(idVet, vData)
        .then(result => {
            res.redirect('/vets/afterEdit');

        })
        .catch(err => {
            //res.status(500).json(err);
            res.render('pages/vet/v_form', {
                Vet: vData,
                formMode: 'edit',
                pageTitle: req.__('vet.pages.edit'),
                formAction: '../../vets/edit',
                navLocation: 'vet',
                actionBefore: '',
                validationErrors: err.details
            });

        });

}


exports.showVetDelete = (req, res, next) => {
    const idVet=req.params.idVet;
    res.render('pages/vet/v_want-delete', {
        navLocation: 'vet',
        actionBefore: '',
        idVet: idVet,
    });

}



exports.deleteVet = (req, res, next) => {
    const idVet=req.params.idVet;
    VetRepository.deleteVet(idVet)
        .then(() => {
            res.redirect('../../vets/afterDelete');
        })
}

exports.showVetListAfterAdd = (req, res, next) => {
    VetRepository.getVets()
        .then(Vet => {
            res.render('pages/vet/v_list', {
                Vet: Vet,
                    navLocation: 'vet' ,
                    actionBefore: 'add'
                }
            )
        })
}

exports.showVetListAfterEdit = (req, res, next) => {
    VetRepository.getVets()
        .then(Vet => {
            res.render('pages/vet/v_list', {
                Vet: Vet,
                    navLocation: 'vet' ,
                    actionBefore: 'edit'
                }
            )
        })
}

exports.showVetListAfterDelete = (req, res, next) => {
    VetRepository.getVets()
        .then(Vet => {
            res.render('pages/vet/v_list', {
                Vet: Vet,
                    navLocation: 'vet' ,
                    actionBefore: 'delete'
                }
            )
        })
}


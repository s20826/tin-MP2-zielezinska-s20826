const ClientRepository = require('../repository/mysql2/clientRepository')

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(Client => {
            res.render('pages/client/c_list', {
                TabClient: Client,
                    navLocation: 'client' ,
                    actionBefore: ''
                }
            )
        })
}

exports.showClientForm = (req, res, next) => {
            res.render('pages/client/c_form', {
                TabClient:{},
                formMode: 'add',
                pageTitle: req.__('client.pages.new'),
                formAction: '../../clients/add',
                navLocation: 'client',
                actionBefore: '',
                validationErrors:[]
        });
}

exports.addClient = (req, res, next) => {
    const cData={...req.body};
    ClientRepository.createClient(cData)
        .then(() => {
            res.redirect('../../clients/afterAdd')

        })
        .catch(err => {
            //res.status(500).json(err);
            res.render('pages/client/c_form', {
                validationErrors: err.details,
                TabClient: cData,
                formMode: 'add',
                pageTitle: req.__('client.pages.new'),
                formAction: '../../clients/add',
                navLocation: 'client',
                actionBefore: '',
            });

        });
}
exports.showClientEdit = (req, res, next) => {
    const idClient = req.params.idClient;
    ClientRepository.getClientById(idClient)
        .then(Clients => {
            res.render('pages/client/c_form', {
                TabClient: Clients,
                formMode: 'edit',
                pageTitle: req.__('client.pages.edit'),
                formAction: '../../clients/edit',
                navLocation: 'client',
                actionBefore: '',
                validationErrors: []

            });
        });
}
exports.updateClient = (req, res, next) => {
    const idClient=req.body.idClient;
    const cData={...req.body};
    ClientRepository.updateClient(idClient, cData)
        .then(() => {
            res.redirect('/clients/afterEdit');

        })
        .catch(err => {
            //res.status(500).json(err);
            console.log(err)
            res.render('pages/client/c_form', {
                TabClient: cData,
                formMode: 'edit',
                pageTitle: req.__('client.pages.edit'),
                formAction: '../../clients/edit',
                navLocation: 'client',
                actionBefore: '',
                validationErrors: err.details
            });

        });
}

exports.showClientDelete = (req, res, next) => {
    const idClient=req.params.idClient;
    res.render('pages/client/c_want-delete', {
                navLocation: 'client',
                actionBefore: '',
                idClient: idClient,
            });

}

exports.deleteClient = (req, res, next) => {
    const idClient=req.params.idClient;
    ClientRepository.deleteClient(idClient)

        .then(() => {
            res.redirect('../../clients/afterDelete');

        })
}


exports.showClientListAfterAdd = (req, res, next) => {
    ClientRepository.getClients()
        .then(Client => {
            res.render('pages/client/c_list', {
                TabClient: Client,
                    navLocation: 'client' ,
                    actionBefore: 'add'
                }
            )
        })
}

exports.showClientListAfterEdit = (req, res, next) => {
    ClientRepository.getClients()
        .then(Client => {
            res.render('pages/client/c_list', {
                TabClient: Client,
                    navLocation: 'client' ,
                    actionBefore: 'edit'
                }
            )
        })
}
exports.showClientListAfterDelete = (req, res, next) => {
    ClientRepository.getClients()
        .then(Client => {
            res.render('pages/client/c_list', {
                TabClient: Client,
                    navLocation: 'client' ,
                    actionBefore: 'delete'
                }
            )
        })
}

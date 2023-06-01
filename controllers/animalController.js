const AnimalRepository = require('../repository/mysql2/AnimalRepository');
const ClientRepository = require('../repository/mysql2/clientRepository')


exports.showAnimalList = (req, res, next) => {
    AnimalRepository.getAnimals()
        .then(Animal => {
            res.render('pages/animal/a_list', {
                Animal: Animal,
                navLocation: 'animal' ,
                actionBefore: ''
            }
        )
        })
}

exports.showAnimalForm = (req, res, next) => {
    ClientRepository.getClients()
        .then(Clients => {
            res.render('pages/animal/a_form1', {
                Animal: {},
                TabClients: Clients,
                formMode: 'add',
                pageTitle: req.__('animal.pages.new'),
                formAction: '../../animals/add',
                navLocation: 'animal',
                actionBefore: '',
                ifAfterError:'no',
                validationErrors: []

            });
        })

}
exports.addAnimal = (req, res, next) => {
    const aData={...req.body};
    let clients;
    ClientRepository.getClients()
        .then(Client => {
            clients=Client;

            return AnimalRepository.createAnimal(aData);
        })
        .then(() => {
            res.redirect('/animals/afterAdd')

        })
        .catch(err => {
            //res.status(500).json(err);
            res.render('pages/animal/a_form1', {
                Animal: aData,
                TabClients: clients,
                formMode: 'add',
                pageTitle: req.__('animal.pages.new'),
                formAction: '../../animals/add',
                navLocation: 'animal',
                actionBefore: '',
                ifAfterError:'yes',
                validationErrors: err.details
            });

        });


};

exports.showAnimalEdit = (req, res, next) => {
    const idAnimal = req.params.idAnimal;
    let animal;
    AnimalRepository.getAnimalById(idAnimal)
        .then(Animal => {
            animal=Animal;
            return ClientRepository.getClients();
        })
        .then(Client =>{
        res.render('pages/animal/a_form1', {
            Animal: animal,
            TabClients: Client,
            formMode: 'edit',
            pageTitle: req.__('animal.pages.edit'),
            formAction: '../../animals/edit',
            navLocation: 'animal',
            actionBefore: '',
            ifAfterError:'no',
            validationErrors: []

        });
    });
}


exports.updateAnimal = (req, res, next) => {
    const idAnimal=req.body.idAnimal;
    let clients;
    const aData={...req.body};
    ClientRepository.getClients()
        .then(Client => {
            clients=Client;
            return AnimalRepository.updateAnimal(idAnimal, aData)
        })
        .then(() => {
            res.redirect('/animals/afterEdit');

        })
        .catch(err => {
            //res.status(500).json(err);
            res.render('pages/animal/a_form1', {
                Animal: aData,
                TabClients: clients,
                formMode: 'edit',
                pageTitle: req.__('animal.pages.edit'),
                formAction: '../../animals/edit',
                navLocation: 'animal',
                actionBefore: '',
                ifAfterError:'yes',
                validationErrors: err.details
            });

        });

}

exports.showAnimalDetails = (req, res, next) => {
    const idAnimal = req.params.idAnimal;
    AnimalRepository.getAnimalById(idAnimal)

        .then(Animal =>{
            console.log(Animal)
            res.render('pages/animal/a_form1', {
                Animal: Animal,
                formMode: 'showDetails',
                pageTitle: req.__('animal.pages.details'),
                formAction: '/animals/edit',
                navLocation: 'animal',
                actionBefore: '',
                ifAfterError:'no',
                validationErrors: []

            });
        });
}

exports.showAnimalDelete = (req, res, next) => {
    const idAnimal = req.params.idAnimal;
            res.render('pages/animal/a_list-want-delete', {
                idAnimal: idAnimal,
                navLocation: 'animal',
                actionBefore: ''
            });

}


exports.deleteAnimal = (req, res, next) => {
    const idAnimal=req.params.idAnimal;
    AnimalRepository.deleteAnimal(idAnimal)
        .then(() => {
            res.redirect('../../animals/afterDelete');

        })
}

exports.showAnimalListAfterAdd = (req, res, next) => {
    AnimalRepository.getAnimals()
        .then(Animal => {
            res.render('pages/animal/a_list', {
                    Animal: Animal,
                    navLocation: 'animal' ,
                    actionBefore: 'add'
                }
            )
        })
}

exports.showAnimalListAfterEdit = (req, res, next) => {
    AnimalRepository.getAnimals()
        .then(Animal => {
            res.render('pages/animal/a_list', {
                    Animal: Animal,
                    navLocation: 'animal' ,
                    actionBefore: 'edit'
                }
            )
        })
}
exports.showAnimalListAfterDelete = (req, res, next) => {
    AnimalRepository.getAnimals()
        .then(Animal => {
            res.render('pages/animal/a_list', {
                    Animal: Animal,
                    navLocation: 'animal' ,
                    actionBefore: 'delete'
                }
            )
        })
}

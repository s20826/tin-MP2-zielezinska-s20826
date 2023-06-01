const VisitRepository = require('../repository/mysql2/visitRepository');
const AnimalRepository = require('../repository/mysql2/AnimalRepository');
const VetRepository = require('../repository/mysql2/vetRepository');

exports.showVisitList = (req, res, next) => {
    VisitRepository.getVisits()
        .then(Visit => {
            res.render('pages/visits/visit_list', {
                    Visit: Visit,
                    navLocation: 'visit' ,
                    actionBefore: ''
                }
            )
        })
}

exports.showVisitForm = (req, res, next) => {
    let animals;
    AnimalRepository.getAnimals()
        .then(Animal => {
            animals=Animal;
            return VetRepository.getVets();
        })
        .then(Vets =>{
            res.render('pages/visits/visit_form', {
                Visit: {},
                Animals: animals,
                Vets: Vets,
                formMode: 'add',
                pageTitle: req.__('visit.pages.new'),
                formAction: '../../visits/add',
                navLocation: 'visit',
                ifAfterError:'no',
                actionBefore: '',
                validationErrors: []

            });
        });
}

exports.addVisit = (req, res, next) => {
    const vData={...req.body};
    let vets,animals;
    VetRepository.getVets()
        .then(Vets => {
            vets=Vets;
            return AnimalRepository.getAnimals();
        })
        .then(Animals => {
            animals=Animals;
            return VisitRepository.createVisit(vData)
        })
        .then(()=>{
            res.redirect('/visits/afterAdd')
        })
        .catch(err => {
            //res.status(500).json(err);
            res.render('pages/visits/visit_form', {
                Vets: vets,
                Animals: animals,
                Visit:vData,
                formMode: 'add',
                pageTitle: req.__('visit.pages.new'),
                formAction: '../../visits/add',
                navLocation: 'visit',
                actionBefore: '',
                ifAfterError:'yes',
                validationErrors: err.details
            });

        });
}


exports.showVisitEdit = (req, res, next) => {
    const idVisit = req.params.idVisit;
    let animals,visit;
    VisitRepository.getVisitById(idVisit)
        .then(Visit => {
            visit=Visit;
            return AnimalRepository.getAnimals();
        })
        .then(Animal => {
            animals=Animal;
            return VetRepository.getVets();
        })
        .then(Vets =>{
            res.render('pages/visits/visit_form', {
                Visit:visit,
                Animals: animals,
                Vets: Vets,
                formMode: 'edit',
                pageTitle: req.__('visit.pages.edit'),
                formAction: '../../visits/edit',
                navLocation: 'visit',
                actionBefore: '',
                ifAfterError:'no',
                validationErrors: []

            });
        });
}
exports.updateVisit = (req, res, next) => {
    const idVisit=req.body.idAnimal;
    const vData={...req.body};
    let vets,animals;
    VetRepository.getVets()
        .then(Vets => {
            vets=Vets;
            return AnimalRepository.getAnimals();
        })
        .then(Animals => {
            animals=Animals;
            return VisitRepository.updateVisit(idVisit,vData)
        })
        .then(()=>{
            res.redirect('/visits/afterEdit')
        })
        .catch(err => {
            //res.status(500).json(err);
            res.render('pages/visits/visit_form', {
                Vets: vets,
                Animals: animals,
                Visit:vData,
                formMode: 'edit',
                pageTitle: req.__('visit.pages.edit'),
                formAction: '../../visits/edit',
                navLocation: 'visit',
                actionBefore: '',
                ifAfterError:'yes',
                validationErrors: err.details
            });

        });
}



exports.showVisitDetails = (req, res, next) => {
    const idAnimal = req.params.idAnimal;
    AnimalRepository.getAnimalById(idAnimal)
        .then(Animal =>{
            res.render('pages/animal/a_details', {
                Animal: Animal,
                formMode: 'showDetails',
                pageTitle: req.__('animal.pages.detail.details'),
                formAction: '/animals/edit',
                navLocation: 'animal',
                actionBefore: '',
                ifAfterError:'no',
                validationErrors: []
            });
        });
}


exports.showVisitDelete = (req, res, next) => {
    const idVisit = req.params.idVisit;

            res.render('pages/visits/visit_list-want-delete', {
                idVisit: idVisit,
                navLocation: 'visit',
                actionBefore: ''
            });
}



exports.deleteVisit = (req, res, next) => {
    const idVisit=req.params.idVisit;
    VisitRepository.deleteVisit(idVisit)
        .then(() => {
            res.redirect('../../visits/afterDelete');

        })
}
exports.showVisitListAfterAdd = (req, res, next) => {
    VisitRepository.getVisits()
        .then(Visit => {
            res.render('pages/visits/visit_list', {
                    Visit: Visit,
                    navLocation: 'visit' ,
                    actionBefore: 'add'
                }
            )
        })
}
exports.showVisitListAfterEdit = (req, res, next) => {
    VisitRepository.getVisits()
        .then(Visit => {
            res.render('pages/visits/visit_list', {
                    Visit: Visit,
                    navLocation: 'visit' ,
                    actionBefore: 'edit'
                }
            )
        })
}
exports.showVisitListAfterDelete = (req, res, next) => {
    VisitRepository.getVisits()
        .then(Visit => {
            res.render('pages/visits/visit_list', {
                    Visit: Visit,
                    navLocation: 'visit' ,
                    actionBefore: 'delete'
                }
            )
        })
}


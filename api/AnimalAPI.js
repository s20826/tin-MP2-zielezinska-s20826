const AnimalRepository = require('../repository/mysql2/AnimalRepository');

exports.getAnimals = (req, res, next) => {
    AnimalRepository.getAnimals()
        .then(a => {
            res.status(200).json(a);

        })
        .catch(err => {
            console.log(err);
        });
    };
    
exports.getHistory = (req, res, next) => {
    AnimalRepository.getHistory()
        .then(a => {
            res.status(200).json(a);

        })
        .catch(err => {
            console.log(err);
        });
    };


exports.getAnimalById = (req, res, next) => {
    const idAnimal = req.params.idAnimal;
    AnimalRepository.getAnimalById(idAnimal)
        .then(a => {
            if(!a){
                res.status(404).json({
                    message: 'Animal with id:'+ idAnimal +'not found'
                })
            }else {
                res.status(200).json(a);

            }
        })

};

exports.getAnimalById2 = (req, res, next) => {
    const idAnimal = req.params.idAnimal;
    AnimalRepository.getAnimalById2(idAnimal)
        .then(a => {
            if(!a){
                console.log(this.state)
                res.status(404).json({
                    message: 'Animal with id:'+ idAnimal +'not found'
                })
            }else {
                res.status(200).json(a);

            }
        })

};
exports.createAnimal = (req, res, next) => {
    AnimalRepository.createAnimal(req.body)
        .then(a => {
            res.status(201).json(a);
        })
        .catch(err => {
            console.log(err)
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateAnimal = (req, res, next) => {
    const idAnimal = req.params.idAnimal;
    AnimalRepository.updateAnimal(idAnimal, req.body)
        .then(a => {
            res.status(200).json({
                message: 'Animal updated!', animal: a
            });
        })
        .catch(err => {
            console.log(err)
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAnimal = (req, res, next) => {
    const idAnimal = req.params.idAnimal;

    AnimalRepository.deleteAnimal(idAnimal)
        .then(a => {
            res.status(200).json({
                message: 'Animal removed!', animal: a
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
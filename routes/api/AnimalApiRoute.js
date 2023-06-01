const express= require('express');
const router = express.Router();

const animalApiController = require('../../api/AnimalAPI');

router.get('/', animalApiController.getAnimals);
router.get('/history', animalApiController.getHistory);
router.get('/:idAnimal', animalApiController.getAnimalById);
router.get('/form/:idAnimal', animalApiController.getAnimalById2);
router.post('/', animalApiController.createAnimal);
router.put('/:idAnimal', animalApiController.updateAnimal);
router.delete('/:idAnimal', animalApiController.deleteAnimal);

module.exports = router;

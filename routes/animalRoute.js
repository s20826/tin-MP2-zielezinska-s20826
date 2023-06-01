var express = require('express');
var router = express.Router();

const animalController = require('../controllers/animalController');

router.get('/', animalController.showAnimalList);
router.get('/add', animalController.showAnimalForm);
router.post('/add',animalController.addAnimal);
router.get('/details/:idAnimal', animalController.showAnimalDetails);
router.get('/edit/:idAnimal', animalController.showAnimalEdit);
router.get('/afterAdd', animalController.showAnimalListAfterAdd);
router.get('/afterEdit', animalController.showAnimalListAfterEdit);
router.get('/afterDelete', animalController.showAnimalListAfterDelete);
router.post('/edit',animalController.updateAnimal);
router.get('/ifDelete/:idAnimal', animalController.showAnimalDelete);
router.get('/delete/:idAnimal', animalController.deleteAnimal);


module.exports = router;
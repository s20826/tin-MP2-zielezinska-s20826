var express = require('express');
var router = express.Router();

const vetController = require('../controllers/vetController');

router.get('/', vetController.showVetList);
router.get('/add', vetController.showVetForm);
router.get('/edit/:idVet', vetController.showVetEdit);
router.get('/afterAdd', vetController.showVetListAfterAdd);
router.get('/afterEdit', vetController.showVetListAfterEdit);
router.get('/afterDelete', vetController.showVetListAfterDelete);
router.post('/add',vetController.addVet);
router.post('/edit',vetController.updateVet);
router.get('/ifDelete/:idVet', vetController.showVetDelete);
router.get('/delete/:idVet', vetController.deleteVet);

const AuthController = require('../controllers/authController');
router.post('/login',AuthController.login);
router.get('/logout',AuthController.logout);

module.exports = router;
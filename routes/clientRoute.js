var express = require('express');
var router = express.Router();

const clientController = require('../controllers/clientController');

router.get('/', clientController.showClientList);
router.get('/add', clientController.showClientForm);
router.get('/edit/:idClient', clientController.showClientEdit);
router.get('/afterAdd', clientController.showClientListAfterAdd);
router.get('/afterEdit', clientController.showClientListAfterEdit);
router.get('/afterDelete', clientController.showClientListAfterDelete);
router.post('/add',clientController.addClient);
router.post('/edit',clientController.updateClient);
router.get('/ifDelete/:idClient', clientController.showClientDelete);
router.get('/delete/:idClient', clientController.deleteClient);

module.exports = router;
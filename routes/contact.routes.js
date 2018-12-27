var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contact.controller');

router.post('/register', contactController.Create);

router.get('/getAllContact',contactController.verifyToken,contactController.getAllContact);

router.post('/edit/:contact_id',contactController.verifyToken,contactController.editContact);

router.post('/delete/:contact_id',contactController.verifyToken,contactController.deleteContact);

module.exports = router;
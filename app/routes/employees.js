var express = require('express');
var router = express.Router();

var employeeController = require('../controllers/employeeController');

router.get('/', employeeController.findAll);
router.get('/:id', employeeController.findOne);
router.post('/', employeeController.create);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

module.exports = router;



var express = require('express');
var router = express.Router();

var assignmentController = require('../controllers/assignmentController');

router.get('/', assignmentController.findAll);
router.get('/:id', assignmentController.findOne);
router.post('/', assignmentController.create);
router.put('/:id', assignmentController.update);
router.delete('/:id', assignmentController.delete);

module.exports = router;



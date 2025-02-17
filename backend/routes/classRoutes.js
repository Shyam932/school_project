const express = require('express');
const router = express.Router();
const classController = require('../Controllers/classController');

// Routes for Class
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', classController.createClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);
router.get('/:id/details', classController.getClassDetails);

module.exports = router;

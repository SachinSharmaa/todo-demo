const router = require('express').Router();
const auth = require('../auth');
const TASK_CONTROLLER = require('../../controllers/Task.controller');

router.post('/', auth.required, TASK_CONTROLLER.addTask);

router.put('/', auth.required, TASK_CONTROLLER.updateTask);

router.delete('/:taskId',auth.required, TASK_CONTROLLER.deleteTask);

module.exports = router;
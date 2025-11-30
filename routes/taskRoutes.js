import express from 'express';
import taskController from '../controllers/taskController.js';
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get('/', verifyToken, taskController.getAllTasks);

router.get('/tasksWithUsers', verifyToken, taskController.getTasksWithUsers);

router.get('/taskWithUser/:id', verifyToken, taskController.getTaskByIdWithUser);

router.get('/user/:userId', verifyToken, taskController.getTasksByUserId);

router.get('/:id', verifyToken, taskController.getTaskById);


router.post('/', verifyToken, taskController.createTask);


router.put('/:id', verifyToken, taskController.updateTask);


router.delete('/:id', verifyToken, taskController.deleteTask);

export default router;

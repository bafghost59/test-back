import express from 'express';
import userController from '../controllers/userController.js'
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router(); 



router.get('/allUsers', verifyToken, userController.getAllUsers);

router.get('/users/info', verifyToken, userController.getInfoUser);

router.get('/users/:id', verifyToken, userController.getUserById);

router.post('/users/resetPassword', userController.getUserByEmail);

router.post('/users', userController.addUser);

router.put('/users/:id', verifyToken, userController.updateUser);

router.delete('/users/:id', verifyToken, userController.deleteUser);

router.post('/users/login', userController.ConnexionUser);

router.post('/deconnexionUser', userController.DeconnexionUser)


export default router;
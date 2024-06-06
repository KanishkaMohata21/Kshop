import express from 'express';
import {register,login,adminpanel,forgetPassword} from '../controllers/authcontrollers.js'
import {authenticateUser, isAdmin} from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.get('/adminpanel',authenticateUser,isAdmin,adminpanel)
router.post('/forgetpassword', forgetPassword);

export default router
import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
const router = express.Router();
// Authentication routes  i am not  write the  logice in these  file  write all  logice in the  ../controllers/auth.controller.js  and  import  here


//  signup routes
 router.post('/signup' ,signup)



// login route
router.post('/login',login )


//  logout route
router.post('/logout',logout );

export default router;
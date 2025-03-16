import express from 'express';
import { login, logout, signup ,updateProfile,checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();
// Authentication routes  i am not  write the  logice in these  file  write all  logice in the  ../controllers/auth.controller.js  and  import  here


//  signup routes
 router.post('/signup' ,signup)



// login route
router.post('/login',login )


//  logout route
router.post('/logout',logout );

//  this  is  use   for the updateprofile  and protectRoute  will  be use  in  the midddleware 
  router.put("/update-profile",protectRoute,updateProfile)

//     if  user  not  authincated  then  not call this  function  if  authicated then  call next  function 
   router.get("/check",protectRoute,checkAuth)


export default router;
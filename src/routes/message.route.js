import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getuserforSidebar,getMessage, sendMessage } from '../controllers/message.controller.js'
 const  router=express.Router()
//   make th first  get  method  for thev user  with protected  and  auth 
 router.get("/users",protectRoute,getuserforSidebar)
//  make the  function in the message controller  file  with  name  is the  getuserforsidebar
//   this is  triggerd  when  user   id  matach  and  then  send the massage
 router.get("/:id",protectRoute,getMessage)

//   this  send the message  and  also  send the message  unauthrized  user 
router.post("send/:id",protectRoute,sendMessage)

  export default  router

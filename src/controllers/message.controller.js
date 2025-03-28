import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export  const  getuserforSidebar=async(req,res)=>{ 
    // it  chke  user  id   if not match  the  find  and   if not  finds  the   give the  error 
    try{
       const loggedIdUserId=res.user._id;
        const  filteredUsers=await User. find({_id:{$ne:loggedIdUserId}}).select("-password")
         res.status(200).json(filteredUsers); 
        
    }
     catch (error)  {
 console.error("Error in  getuserforSidebar:",error.message);
 res.status(500).json({error:"Internal server error"})
     }

}
 export  const  getMessage=async(req,res)=>{
    try {
         const {id:userToChatId}=res.params
           const  myId=req.user._id
             const  message=await Message.find({
                //  this is make the massge  sode  my  my  side or  user  side 
                  $or:[
                  {senderId:myId,receiverId:userToChatId},
                     {senderId:userToChatId,receiverId:myId}
                  ]
             })
             res.status(200).json(message);
            }catch ( error) {
                console.error("Error in gerMessage controller:", error.message);
                 res.status(500).json({error:"Internal  server  error "})
        
    }

 }

//   make the sendMessage   function  in   then  message   controller in   tjis message  may  text  or  image 
 export  const  sendMessage=async(req,res)=>{
try {
  const {text,image}=req.body;
   const  {id: receiverId}=req.params;
   const senderId=req.user._id;
   let imageUrl; 
    if(image){
       const uploadResponse=await clouderinary.uploader.upload(image);
       imageUrl=uploadResponse.secure_url;

    }
    const newMessage=new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl
    })
await newMessage.save();
//  we  here add  real time  functionality  to send  the message  to the  user  make the todo  soket.io
res.status(200).json(newMessage);
   
} catch (error) {
    console.error("Error in sendMessage controller:",error.message);
      res.status(500).json({error:"Internal server error"})
}


 }

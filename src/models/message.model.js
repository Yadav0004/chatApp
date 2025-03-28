import mongoose from "mongoose";
 const messagegSchema=new mongoose.Schema(
    {

      senderId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
          required:true

      },
      receiverId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
          required:true

      },
       text:{
        type:String,
        //  BOTH  ARE  NOT  REQIRE  BECUSE  SOME  MESSAGE I THE  text  and  may be  image 

       },
        image:{
            type:String,
        }
    }
    ,
     {
timestamps:true
     }
);
 const Message=mongoose.model("Message",messagegSchema)
  export default Message;
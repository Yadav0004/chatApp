//    for the  g enrate  token  you  need   jwttoken   from  env  
//     for  genrate  token  we  nees  payload
import jwt from "jsonwebtoken"
 export  const  generateToken=(userId, res)=>{
     const token=jwt.sign({userId},process.env.JWT_SECRET,{

        expiresIn:"7d" // this  will  be  expire in the 7 days
  } )
   res.cookie("jwt",token,{
    //  maxAge should  be
     maxAge:7*24*60*60*1000,
    httpOnly:true,
     smaesite:"strict",
secure:process.env.NODE_ENV="development",
   })
    return token
 }
//   now this  jenrate  token  use in  authcontroller 
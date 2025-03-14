import { generateToken } from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    try {
        const { fullName, email, password, profilePic } = req.body;

        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePic: profilePic || ""
        });

        // Save user and generate token
        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = (req, res) => {
    res.send("login route")
}

export const logout = (req, res) => {
    res.send("logout route")
}


/*import { generateToken } from '../lib/utils.js'
import User  from '../models/user.model.js'
 import bcrypt from 'bcryptjs'
 export const  signup= async (req,res)=>{
      const  {fullName,email,password,profilePic}=req.body  //  make the request  in index.js 
try {
    //  creating  tokein   for auth hashing  password  IF  pasword is  less than 6  then  thorw  error  if  not  go forword
     if(!fullName || !email|| !password) {
        return res.status(400).json({messages:"All  fiealds  are  required"})

     }
       if (password.length<6){
        return res.status(400).json({messages:"password  us  must  be  at least 6 characters"})
       }
         const user=await User.findOne({email})
          if(user) return res.status(400).json({messages:"Email Already  exists "})
 
 const salt= await  bcrypt.getSalt(10)
  const hashePassword=await bcrypt.hash(password,salt)

   const newUser= newUser({
    fullName,
    email,
    password: hashePassword
   })
    if( newUser){
        //  here  we    write   user  database  with  jwt   token 
        //   if we   have  nw   use then  success 
        //  this  is  come  from thev utils 
         generateToken(newUser._id,res)
         await newUser.save()
          res.status(201).json({
            _id:newUser._id,
             fullName: newUser.fullName,
              email:newUser.email,
              profilePic:newUser.profilePic,

            

    })

    }
      else{
        res.status(400).json({messages:"invalid user data"})
        //   if not  have   new  user then  error 
      }
} catch (error) {
    console.log("error  in  signup  controller",error.messages) ;
    res.status(500).json({messages:"Internal Server Error"})

}     
 }

 export const  login=((req,res)=>{
    res.send("login route")
})

export const  logout=((req,res)=>{
    res.send("logout route")
})
 */
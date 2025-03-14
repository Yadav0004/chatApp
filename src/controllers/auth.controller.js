import { generateToken } from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { fullName, email, password, profilePic } = req.body  //  make the request  in index.js 
    try {
        //  creating  tokein   for auth hashing  password  IF  pasword is  less than 6  then  thorw  error  if  not  go forword
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" })
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email Already exists" })

        const salt = await bcrypt.genSalt(10)  // Fixed: getSalt -> genSalt
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({  // Fixed: newUser -> new User
            fullName,
            email,
            password: hashedPassword,
            profilePic: profilePic || ""
        })

        if (newUser) {
            //  here  we    write   user  database  with  jwt   token 
            //   if we   have  nw   use then  success 
            //  this  is  come  from thev utils 
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({ message: "invalid user data" })
            //   if not  have   new  user then  error 
        }
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// in the  login  if  user  passworsd and  email is math then user  is valide otherwise   register   first 
export const login = async (req, res) => {
    const { email, password } = req.body  // Fixed: res.body -> req.body
    try {
        //  find the user  is  existes  or  not 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // if  user  find then  may  be the  pass password  is the  wrong 
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("error in the login controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })  // Fixed: req.cookie -> res.cookie
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}
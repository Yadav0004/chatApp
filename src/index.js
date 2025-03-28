import express from 'express';
import dotenv from 'dotenv'
import cookieParser  from "cookie-parser"
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import messageRoutes from './routes/message.route.js'

dotenv.config();
const app = express();


//here  i am   import the  PORT
 const PORT=process.env.PORT;











// Middleware  form the userAuth
 app.use(express.json())

//  this is  cookiePaser  use  for the  profile  update
 app.use(cookieParser())

 app.use(cors({origin:'http://localhost:5173',
    credentials:true}))

// Routes
app.use('/api/auth', authRoutes);
//  this is the  modle of the  message  which  send  to  user 
app.use('/api/message', messageRoutes);




app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
     connectDB()
});
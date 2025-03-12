import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';


dotenv.config();
const app = express();


//here  i am   import the  PORT
 const PORT=process.env.PORT;











// Middleware



// Routes
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
     connectDB()
});
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';

 
 const app = express();

 await connectDB();

 app.use(cors());
 app.use(express.json());

 app.get('/',(req,res)=>res.send('Api is working'));
 app.use('/api/user', authRouter);


 const PORT = process.env.PORT || 3000;

 app.listen(PORT,()=>{
    console.log("server is running on port " +PORT);
 })

 export default app;
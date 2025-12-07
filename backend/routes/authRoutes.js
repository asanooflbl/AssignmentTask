import express from 'express'
import { userlogin, usersignup } from '../controllers/authcontroller.js';


const authRouter = express.Router();
authRouter.post("/signup",usersignup)
authRouter.post("/login",userlogin)


export default authRouter;
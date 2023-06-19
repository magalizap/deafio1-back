import { Router } from "express";
import { userModel } from "../models/User.js";
import { hashData, compareData } from "../path.js";

const userRouter = Router()


userRouter.post('/signup', async(req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(user){
        return res.redirect('/api/session/errorSignup')
    }
    const hashPassword = await hashData(password)
    const newUser = {...req.body, password: hashPassword}
    await userModel.create(newUser)
    res.redirect('/api/session')
})

userRouter.post('/login', async(req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.redirect('/api/session/errorLogin')
    }
    const isPasswordValid = await compareData(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({message: 'Email or password not valid'})
    }
    req.session.user = user
    res.redirect('/realtimeproducts')
})

userRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error){
            console.log(error)
            res.send(error)
        }else{
            res.redirect('/api/session')
        }
    })
})

export default userRouter

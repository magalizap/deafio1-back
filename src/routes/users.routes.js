import { Router } from "express";
import { userModel } from "../models/User.js";
import passport from "passport";

const userRouter = Router()

// PASSPORT LOCAL

userRouter.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/api/session/errorSignup',
    successRedirect: '/api/session'
}))


userRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/session/errorLogin',
    successRedirect: '/realtimeproducts'
}), async(req, res) => {

    const user = await userModel.findOne({email})
    req.session.user = user
    res.send({payload: req.user})
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

// PASSPORT GITHUB

userRouter.get('/githubSignup', passport.authenticate('githubSignup', {scope: ['user: email']}))

userRouter.get('/github', passport.authenticate('githubSignup', {failureRedirect: '/api/session/errorLogin', successRedirect: '/realtimeproducts'}))


export default userRouter

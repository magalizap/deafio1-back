import { Router } from "express"
import { messageModel } from "../models/Messages.js"

const chatRouter = Router()


chatRouter.get('/', async (req, res) => {

    const messages = await messageModel.find()
    req.io.on('connection', async(socket) => {
        socket.on('mensaje', async (info) => {
            console.log(messages)
            const {user, message} = info
            await messageModel.insertMany([{user, message}])
            req.io.emit('mensajes', messages)
        })
    })

    res.render('chat', messages)
})


/*
chatRouter.post('/', async (req, res) => {
    const {user, message} = req.body
    await messageModel.insertMany([{user, message}])
    req.io.emit('mensajes', {user, message})
    res.render('chat', {user, message})
})*/



export default chatRouter
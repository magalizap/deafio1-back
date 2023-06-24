import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import viewRouter from './routes/view.routes.js'
import chatRouter from './routes/chat.routes.js'
import sessionRouter from './routes/session.routes.js'
import userRouter from './routes/users.routes.js'
import { __dirname, } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import 'dotenv/config.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import './passportStrategies.js'


// Config
const app = express()
const PORT = 4000
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

app.engine('handlebars', engine({runtimeOptions: 
    { allowProtoPropertiesByDefault: true, 
    allowProtoMethodsByDefault: true},
    helpers: {eq: function(a, b, options){
        if(a === b){
            return options.fn(this)
        }else{
            return options.inverse(this)
        }
    }}
    
})) //trabajo con hbs
app.set('view engine', 'handlebars') // vistas hbs
app.set('views', path.resolve(__dirname, './views')) //mi ruta
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// Middlewares
app.use(express.json()) // para ejecutar JSON 
app.use(express.urlencoded({extended: true})) // req.query
const upload = (multer({storage: storage}))
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({

    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGODB_ATLAS,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 210
    }),

    secret: process.env.SESSION_SECRET,
    resave: false, //para que mi sesión se mantenga activa
    saveUninitialized: true // guardo mi sesión aunq no contenga info
}))
app.use(passport.initialize()) // implementamos passport
app.use(passport.session())


//Mongoose
mongoose.connect(process.env.URL_MONGODB_ATLAS)
.then(() => console.log('DB is connected'))
.catch((error) => console.log('Error en MongoDB Atlas:', error))


// ServerIO y acceso a las rutas
const io = new Server(server, {cors: {origin: '*'}}) 

app.use((req, res, next) => {
    req.io = io
    return next()
})


// Routes
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewRouter)
app.use('/chat', chatRouter)
app.use('/api/session', sessionRouter)
app.use('/api/users', userRouter)
app.use('/', express.static(__dirname + '/public')) // defino la ruta de mi carpeta pública
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send('Imagen subida')
})


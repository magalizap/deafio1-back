import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import viewRouter from './routes/view.routes.js'
import chatRouter from './routes/chat.routes.js'
import { __dirname, } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import 'dotenv/config.js'



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

app.engine('handlebars', engine()) //trabajo con hbs
app.set('view engine', 'handlebars') // vistas hbs
app.set('views', path.resolve(__dirname, './views')) //mi ruta
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// Middlewares
app.use(express.json()) // para ejecutar JSON 
app.use(express.urlencoded({extended: true})) // req.query
const upload = (multer({storage: storage}))

//Mongoose
mongoose.connect(process.env.URL_MONGODB_ATLAS)
.then(() => console.log('DB is connected'))
.catch((error) => console.log('Error en MongoDB Atlas:', error))


// ServerIO 
//const io = new Server(server, {cors: {origin:'', credentials: true}}) //llamo a mi servidor
const io = new Server(server, {cors: {origin: '*'}}) 



//acceso de io p/las rutas
app.use((req, res, next) => {
    req.io = io
    return next()
})


// Routes
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewRouter)
app.use('/chat', chatRouter)
app.use('/', express.static(__dirname + '/public')) // defino la ruta de mi carpeta pública
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send('Imagen subida')
})



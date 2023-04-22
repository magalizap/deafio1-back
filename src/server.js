import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import { __dirname } from './path.js'
import multer from 'multer'

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


// Middlewares
app.use(express.json()) // para ejecutar JSON
app.use(express.urlencoded({extended:true})) // req.query
const upload = (multer({storage: storage}))

// Routes
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/static', express.static(__dirname + '/public')) // defino la ruta de mi carpeta pública
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send('Imagen subida')
})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
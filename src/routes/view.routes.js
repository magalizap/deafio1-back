import { Router } from "express"
import { productModel } from "../models/Products.js"
const viewRouter = Router()

viewRouter.get('/realtimeproducts', async (req, res) => {
    let { status } = req.query
    let { limit } = req.query
    let { page } = req.query
    let { price } = req.query
    const products = await productModel.find()
    req.io.on('connection', async(socket) => { 
        console.log('Client connected')
        req.io.emit('get', products)
    })

    const getQuerys = await productModel.paginate({status: status ?? true}, {limit: limit ?? 10, page: page ?? 1, sort: {price: price ?? -1}})
    
    //res.send(getQuerys)
    res.render('realtimeproducts', getQuerys)
})

viewRouter.post('/realtimeproducts', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body
        await productModel.insertMany([{title, description, price, thumbnail, code, stock, status, category}])

        req.io.emit('post',  { title, description, price, thumbnail, code, stock, status, category })  
        res.render('realtimeproducts',  { title, description, price, thumbnail, code, stock, status, category })
        //res.send("Producto creado")
    } catch (error) {
        res.send(error)
    }

})



export default viewRouter
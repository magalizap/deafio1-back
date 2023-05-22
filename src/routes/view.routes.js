import { Router } from "express"
import { productModel } from "../models/Products.js"
const viewRouter = Router()

viewRouter.get('/realtimeproducts', async (req, res) => {
    let { limit } = req.query
    const products = await productModel.find()
    req.io.on('connection', async(socket) => { 
        console.log('Client connected')
        req.io.emit('get', products)
    })
    if(limit){
        let productLimit = await productModel.find().limit(limit) ///?limit=4
        res.render('realtimeproducts', productLimit)
    }else{
        res.render('realtimeproducts', products)
        //res.send(products)
    }
    
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
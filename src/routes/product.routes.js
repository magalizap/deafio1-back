import { Router } from "express"
import { productModel } from "../models/Products.js"

const productRouter = Router()



//llamo a todos los productos
productRouter.get('/', async (req, res) => {
    let { limit } = req.query
    const products = await productModel.find() //.explain('executionStats')

    if(limit){
        let productLimit = await productModel.find().limit(limit) ///?limit=4
        res.send(productLimit)
    }else{
        res.send(products)
    }
    
})


//llamo al producto por su id
productRouter.get('/:pid', async (req, res) => {
    try {
        const productId = await productModel.findOne({_id: req.params.pid}) // id de ej. para ver funcionamiento '646589ba282c7c17224fd925'
        res.send(productId)   // formato de objetos
    } catch (error) {
        res.send(error)
    }

})

productRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body
        await productModel.insertMany([{title, description, price, thumbnail, code, stock, status, category}])
        res.send("Producto creado")
    } catch (error) {
        res.send(error)
    }

})

productRouter.put('/:pid', async (req, res) => {
    try {
        const _id = req.params.pid
        const {stock} = req.body
        await productModel.updateOne({_id}, {$inc: {stock: stock}}) //incremento el valor del stock del producto seleccionado
        res.send("Producto actualizado")
    } catch (error) {
        res.send(error)
    }

})

productRouter.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        await productModel.deleteOne({_id: id})
        res.send("Producto eliminado")
    } catch (error) {
        res.send(error)
    }
})



export default productRouter
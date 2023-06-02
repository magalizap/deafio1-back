import { Router } from "express"
import { productModel } from "../models/Products.js"

const productRouter = Router()



//llamo a todos los productos
productRouter.get('/', async (req, res) => {

    try {
        let { status } = req.query
        let { limit } = req.query
        let { price } = req.query
        let {page} = req.query
        //const products = await productModel.find()//.explain('executionStats')
        
        const result = await productModel.paginate({status: status ?? true}, {limit: limit ?? 10, page: page ?? 1, sort: {price: price ?? 0}, lean: true})

        result.prevLink = result.hasPrevPage ? `http://localhost:4000/api/product?page=${result.prevPage}` : null
        result.nextLink = result.hasNextPage ? `http://localhost:4000/api/product?page=${result.nextPage}`: null
        res.send(result)


    } catch (error) {
        res.status(500).send(error)
    }
    
}) 


//llamo al producto por su id
productRouter.get('/:pid', async (req, res) => {
    try {
        const productId = await productModel.findOne({_id: req.params.pid}) // id de ej. para ver funcionamiento '646589ba282c7c17224fd925'
        res.status(200).send(productId)
    } catch (error) {
        res.status(500).send(error)
    }

})

productRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body
        await productModel.insertMany([{title, description, price, thumbnail, code, stock, status, category}])
        res.status(200).send("Producto creado")

    } catch (error) {
        res.status(500).send(error)
    }

})

productRouter.put('/:pid', async (req, res) => {
    try {
        const _id = req.params.pid
        const {stock} = req.body
        await productModel.updateOne({_id}, {$inc: {stock: stock}}) //incremento el valor del stock del producto seleccionado
        res.status(200).send("Producto actualizado")
    } catch (error) {
        res.status(500).send(error)
    }

})

productRouter.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        await productModel.deleteOne({_id: id})

        res.status(200).send("Producto eliminado")
    } catch (error) {
        res.status(500).send(error)
    }
})



export default productRouter
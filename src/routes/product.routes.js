import { Router } from "express"
import { productModel } from "../models/Products.js"

const productRouter = Router()

// ESTA RUTA SE USA CON POSTMAN

//llamo a todos los productos
productRouter.get('/', async (req, res) => {
    productRouter.get('/', async (req, res) => {

        try {
            let { status, limit, page, price } = req.query
            //const products = await productModel.find()//.explain('executionStats')
            const getQuerys = await productModel.paginate(
                { status: status ?? true },                   
                { limit: limit || 10, page: page ?? 1, sort: { price: price ?? -1 }}
            )
    
            getQuerys.prevLink = getQuerys.hasPrevPage ? `http://localhost:4000/api/products?page=${getQuerys.prevPage}` : null
            getQuerys.nextLink = getQuerys.hasNextPage ? `http://localhost:4000/api/products?page=${getQuerys.nextPage}`: null
    
            const renderProducts = getQuerys.docs.map(({price, title, stock, status, code, category}) => {
                return {price, title, stock, status, code, category}
            })
    
            res.render('realtimeproducts', {renderProducts})
    
        } catch (error) {
            res.status(500).send(error)
        }
        
    })
    
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
        res.render('realtimeproducts',  { title, description, price, thumbnail, code, stock, status, category })
        //res.status(200).send("Producto creado")

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
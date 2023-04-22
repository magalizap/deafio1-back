import { Router } from "express"
import { ProductManager } from "../productManager.js"


const productManager = new ProductManager('./products.txt')
const productRouter = Router()

//llamo a todos los productos
productRouter.get('/', async (req, res) => {
    let { limit } = req.query
    const products = await productManager.getProduct()
    if(limit){
        //res.send(JSON.stringify(products.slice(0, limit)))
        res.send(products.splice(0, limit))
    }else{
        //res.send(JSON.stringify(products))
        res.send(products)
    }
})

//llamo al producto por su id
productRouter.get('/:pid', async (req, res) => {
    try {
        const productId = await productManager.getProductById(parseInt(req.params.pid))
        //res.send(JSON.stringify(productId))  // para ver en formato json
        res.send(productId)   // formato de objetos
    } catch (error) {
        res.send(error)
    }

})

productRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body
        await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category })
        res.send("Producto creado")
    } catch (error) {
        res.send(error)
    }

})

productRouter.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid)
        const {title, description, price, thumbnail, code, stock, status, category} = req.body
        await productManager.updateProduct(id, {title, description, price, thumbnail, code, stock, status, category})
        res.send("Producto actualizado")
    } catch (error) {
        res.send(error)
    }

})

productRouter.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid)
        await productManager.deleteProduct(id)
        res.send("Producto eliminado")
    } catch (error) {
        res.send(error)
    }
})



export default productRouter

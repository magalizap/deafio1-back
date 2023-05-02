import { Router } from "express"
import { ProductManager } from "../productManager.js"


const productManager = new ProductManager('./products.txt')
const viewRouter = Router()

viewRouter.get('/realtimeproducts', async (req, res) => {
    let { limit } = req.query
    const products = await productManager.getProduct()
    req.io.on('connection', async(socket) => { 
        console.log('Cliente conectado')
        req.io.emit('get', products)
    })
    if(limit){
        //res.send(JSON.stringify(products.slice(0, limit)))
        res.send(products.splice(0, limit))
    }else{
        //res.send(JSON.stringify(products))
        //res.send(products)
        res.render('realtimeproducts', products)
    }
})

viewRouter.post('/realtimeproducts', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body
        await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category })

        req.io.emit('post',  { title, description, price, thumbnail, code, stock, status, category })  
        res.render('realtimeproducts',  { title, description, price, thumbnail, code, stock, status, category })
        //res.send("Producto creado")
    } catch (error) {
        res.send(error)
    }

})




export default viewRouter
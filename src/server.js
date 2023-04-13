import express from 'express'
import { ProductManager } from './index.js'

const productManager = new ProductManager('products.txt')
const app = express()
const PORT = 4000

app.use(express.urlencoded({extended:true}))

//llamo a todos los productos
app.get('/products', async (req, res) => {
    let { limit } = req.query
    const products = await productManager.getProduct()
    if(limit){
        res.send(JSON.stringify(products.slice(0, limit)))
    }else{
        res.send(JSON.stringify(products))
    }
})

//llamo al producto por su id
app.get('/products/:pid', async (req, res) => {
    // tuve que modificar mi getProductById
    const productId = await productManager.getProductById(parseInt(req.params.pid))
    res.send(JSON.stringify(productId))

    // de esta forma no debo comentar el fs.writeFile en el método getProductByID
    /*const products = await productManager.getProduct()
    const productId = products.find(prod => prod.id === parseInt(req.params.pid)) // consulto un usuario dado el id recibido
    if(productId){
        res.send(JSON.stringify(productId))
    }else{
        res.send(`El producto con el id ${req.params.pid} no se encuentra`)
    }*/
    
})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
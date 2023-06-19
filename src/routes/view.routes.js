import { Router } from "express"
import { productModel } from "../models/Products.js"

const viewRouter = Router()

// ESTA RUTA ES PARA LAS VISTAS

viewRouter.get('/realtimeproducts', async (req, res) => {
    let { status, limit, page, price } = req.query
      
    const getQuerys = await productModel.paginate(
      { status: status ?? true },                   
      { limit: limit || 5, page: page ?? 1, sort: { price: price ?? -1 } }
    )

    
    getQuerys.prevLink = getQuerys.hasPrevPage ? `http://localhost:4000/realtimeproducts?page=${getQuerys.prevPage}` : null
    getQuerys.nextLink = getQuerys.hasNextPage ? `http://localhost:4000/realtimeproducts?page=${getQuerys.nextPage}`: null

    const renderProducts = getQuerys.docs.map(({price, title, stock, status, code, category, description}) => {
      return {price, title, stock, status, code, category, description}
    })
    
    req.io.on('connection', async (socket) => {
      console.log('Client connected')
      req.io.emit('get', renderProducts)
      req.io.emit('user',  {user: req.session.user})
     
    })

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
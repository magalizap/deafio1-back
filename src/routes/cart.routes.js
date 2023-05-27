import { Router } from "express";
import { cartModel } from "../models/Carts.js";

const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cartModel.create([{products:[]}])
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})


cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = await cartModel.findOne({_id: req.params.cid}).populate('products.id_prod')
        //const cartJSON = JSON.stringify(cartId)
        res.send(cartId)
    } catch (error) {
        res.send(error)
    }
})

/*
cartRouter.post('/:cid/product/:pid', async (req, res) => { // este método me crea un carrito cada vez que agrego un nuevo producto
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    const addProduct = await cartModel.insertMany([{cid, products: [{id_prod: pid, quantity: quantity}]}])
    res.send(addProduct)
})*/

cartRouter.post('/:cid/product/:pid', async (req, res) => { 
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    const addProduct = await cartModel.insertMany([{cid, products: [{id_prod: pid, quantity: quantity}]}])
    res.send(addProduct)
})


//Nuevos endpoints

cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        await cartModel.deleteOne({id_prod: pid})
        res.send('Producto eliminado del carrito')
    } catch (error) {
        res.send(error)
    }
})

cartRouter.put('/:cid', (req, res) => {

})

export default cartRouter
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
        const cartJSON = JSON.stringify(cartId)
        console.log(cartJSON)
        res.send(cartId)
    } catch (error) {
        res.send(error)
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => { // este método me crea un carrito cada vez que agrego un nuevo producto
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    const addProduct = await cartModel.insertMany([{cid, products: [{id_prod: pid, quantity: quantity}]}])
    res.send(addProduct)
})


export default cartRouter
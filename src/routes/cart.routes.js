import { Router } from "express";
import { CartManager } from "../cartManager.js";

const cartManager = new CartManager('./cart.txt')
const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart()
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})


cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = await cartManager.getCartById(parseInt(req.params.cid))
        res.send(cartId)
    } catch (error) {
        res.send(error)
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const newQuantity = req.body.newQuantity
    const addProduct = await cartManager.addProductCart(cid, pid, newQuantity)
    res.send(addProduct)
})


export default cartRouter
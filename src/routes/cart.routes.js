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
        res.send(cartJSON)
    } catch (error) {
        res.send(error)
    }
})


cartRouter.post("/:cid/product/:pid", async (req, res) => {

    try {
    
        const cid = req.params.cid //cartId que llega por params
        const pid = req.params.pid //id del producto que llega por params
        const parsedQuantity = parseInt(req.body.quantity)
        const cart = await cartModel.findById({ _id: cid }) //busco el idCart y me lo guardo en una variable
        const addProductToCart = { id_prod: pid, quantity: parsedQuantity} // creo el objeto que voy a pushear               
    
        cart.products.push(addProductToCart)// lo pusheo al carrito que busque
    
        await  cart.save()/// el save()
        res.send("El producto se ha añadido correctamente a su carrito");
    
    } catch (error) {
         console.log(error);
    }
    
})

//Nuevos endpoints

cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const cart = await cartModel.findById({ _id: cid })

        cart.products.splice({id_prod: pid}, 1)
        await cart.save()
        res.send('Producto eliminado')
    } catch (error) {
        res.send(error)
    }
})

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const emptyCart = await cartModel.findById({ _id: cid })
        emptyCart.products = []

        await emptyCart.save()
        res.send('Carrito vacío')
    } catch (error) {
        res.send(error)
    }
})

cartRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const {quantity} = req.body

        const cartId = await cartModel.findById({_id: cid})
        const arrayProducts = cartId.products
        const findIdProd =  arrayProducts.findIndex((prod) => prod.id_prod == pid)

        arrayProducts[findIdProd].quantity = quantity

        await cartModel.updateOne({_id: cid}, {products: arrayProducts})
        res.send('cantidad modificada')

    } catch (error) {
        res.send(error)
    }
})

cartRouter.put('/:cid', async (req, res) => { //revisar
    try {
        const cid = req.params.cid
        const {pid} = req.body
        const {quantity} = req.body
        await cartModel.updateOne({_id: cid}, {products: [{id_prod: pid}, {quantity: quantity}]})
        res.send('Carrito actualizado')
    } catch (error) {   
        res.send(error)
    }

})

export default cartRouter
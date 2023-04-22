import {promises as fs} from 'fs'

export class CartManager {
    constructor(path){
        this.path = path
    }

    static incrementarID(){ 
        if(this.idIncrement){
            this.idIncrement++
        }else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async createCart() {
        const cartJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartJSON)
        const cart = {
            id: CartManager.incrementarID(),
            products: []
        }
        carts.push(cart)
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
        return "Nuevo carrito"
    }

    async getCartById(id){
        const cartJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartJSON)
        let aux = carts.find((cart) => cart.id === id)
        if(aux){
            return aux
        }else{
            return "Not found"
        }
    }

    async addProductCart(cid, pid, newQuantity) {
        const cartJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartJSON)
        const idCart = carts.find((cart) => cart.id === cid)

        if(idCart.products.some(product => product.id === pid)){
            
            let index = idCart.products.findIndex(product => product.id === pid)
            idCart.products[index].quantity = newQuantity
           
        }else{
            const newProduct = { id: pid, quantity: newQuantity }
            idCart.products.push(newProduct)
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
        return "Producto agregado"
    }

}

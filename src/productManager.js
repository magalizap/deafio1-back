// PRIMERA PREENTREGA

import {promises as fs} from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path
        this.products = [], // estado inicial del carrito
        this.id = 1
    }
    async addProduct(product){
        for (let i = 0; i < this.products.length; i++) { // Validación campo code
            if(this.products[i].code === product.code){
                console.log(`El código ${product.code} hace referencia a un producto existente`)
                return
            }
        } 

        
            if(!Object.values(product).includes(undefined)){ // corroboramos que no haya campos vacíos
                const prodsJSON = await fs.readFile(this.path, 'utf-8')
                const prods = JSON.parse(prodsJSON)
                product.id = this.id ++
                prods.push(product) // agregamos productos dentro de mi array
                await fs.writeFile(this.path, JSON.stringify(prods, null, 2)) // creo y actualizo mi array de productos en un txt
                return "Producto creado"
            }else{
                console.log('Debes llenar todos los campos')
            }
    }

    
    async getProduct(){
        const prods = await fs.readFile(this.path, 'utf-8') // consulto por el array creado en el txt
        return JSON.parse(prods)
        
    }

    async getProductById(id){
        const readProduct2 = await fs.readFile(this.path, 'utf-8') 
        const prods = JSON.parse(readProduct2)
        let aux = prods.find((product) => product.id === id)
        if(aux){
            return aux
        }else{
            return "Not found"
        }
    }

    async updateProduct(id, updates){ //método para actualizar
        const readProduct3 = await fs.readFile(this.path, 'utf-8') 
        const prods = JSON.parse(readProduct3)
        const productIndex = prods.findIndex((product) => product.id === id)
        if(productIndex === -1){
            console.log('Product not found')
            return
        }
        const updateProduct = Object.assign({}, prods[productIndex], updates)
        prods[productIndex] = updateProduct
        await fs.writeFile(this.path, JSON.stringify(prods))
        return prods
    }
    async deleteProduct(id){ //método para eliminar
        const readProduct4 = await fs.readFile(this.path, 'utf-8') 
        const prods = JSON.parse(readProduct4)
        const aux = prods.filter(products => products.id !== id)
        await fs.writeFile(this.path, JSON.stringify(aux))
    }
}


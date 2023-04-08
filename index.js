// PRIMER Y SEGUNDO DESAFÍO: 

import {promises as fs} from 'fs'

class ProductManager {
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
            product.id = this.id ++
            this.products.push(product) // agregamos productos dentro de mi array
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2)) // creo y actualizo mi array de productos en un txt
        }else{
            console.log('Debes llenar todos los campos')
        }
    }

    
    async getProduct(){
        const readProduct = await fs.readFile(this.path, 'utf-8') // consulto por el array creado en el txt
        const prods = JSON.parse(readProduct)
        console.log(prods)
    }

    async getProductById(id){
        const readProduct2 = await fs.readFile(this.path, 'utf-8') 
        const prods = JSON.parse(readProduct2)
        let aux = prods.find((product) => product.id === id)
        aux ? console.log(aux) : console.log('Not Found')
        await fs.writeFile(this.path, JSON.stringify(aux))
    }
    async updateProduct(id, updates){
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
        console.log(prods)
    }
    async deleteProduct(id){
        const readProduct4 = await fs.readFile(this.path, 'utf-8') 
        const prods = JSON.parse(readProduct4)
        const aux = prods.filter(products => products.id !== id)
        await fs.writeFile(this.path, JSON.stringify(aux))
        console.log(aux)
    }
}

class Product { 
        constructor(title, description, price, thumbnail, code, stock){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
    }
}

const product1 = new Product('La Campagnola', 'Mermelada BC - sabor Frutilla x390g', 624, 'https://jumboargentina.vtexassets.com/arquivos/ids/690034-800-auto?v=637810653703330000&width=800&height=auto&aspect=true','SKU: 11281102036', 147 )

const product2 = new Product('Oreo', 'Galletitas 354gr', 555, 'https://jumboargentina.vtexassets.com/arquivos/ids/712811-800-auto?v=637946193909070000&width=800&height=auto&aspect=true', 'SKU: 11281102032', 310)

const product3 = new Product('Playadito Suave', 'Yerba Mate X1kg', 679, 'https://jumboargentina.vtexassets.com/arquivos/ids/711224-800-auto?v=637938633804770000&width=800&height=auto&aspect=true', 'SKU: 11230376006', 236)

const product4 = new Product('Cachafaz', 'Galletitas Integral Granola', 410, 'https://jumboargentina.vtexassets.com/arquivos/ids/192618-800-auto?v=636383534226100000&width=800&height=auto&aspect=true', 'SKU: 11121604001', 350)
//const product5 = new Product()

const productManager = new ProductManager('./products.txt') 

// utilizando la constante productManager llamamos al método para agregar los productos
await productManager.addProduct(product1)
await productManager.addProduct(product2)
await productManager.addProduct(product3)
await productManager.addProduct(product4)


// prueba code repetido 
const product6 = new Product('Playadito Suave', 'Yerba Mate X1kg', 679, 'https://jumboargentina.vtexassets.com/arquivos/ids/711224-800-auto?v=637938633804770000&width=800&height=auto&aspect=true', 'SKU: 11230376006', 236)
//productManager.addProduct(product6) // producto con code repetido


//productManager.getProductById(4) // buscador de productos por id
//productManager.updateProduct(product2.id, { price: 690, description: "Galletitas Oreo Bañadas Chocolate Leche Milka 119g Capsuland" }) //actualiza campos del producto
//productManager.deleteProduct(3)
//await productManager.getProduct()
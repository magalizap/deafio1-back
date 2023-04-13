// PRIMER Y SEGUNDO DESAFÍO: 

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
            product.id = this.id ++
            this.products.push(product) // agregamos productos dentro de mi array
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2)) // creo y actualizo mi array de productos en un txt
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
        //aux ? console.log(aux) : console.log('Not Found')
        if(aux){
            return aux
        }else{
            return "Not found"
        }
        //await fs.writeFile(this.path, JSON.stringify(aux))
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
        console.log(prods)
    }
    async deleteProduct(id){ //método para eliminar
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
const product5 = new Product('Frutigran', 'Galletitas Avena Y Pasas 250 Gr', 293, 'https://jumboargentina.vtexassets.com/arquivos/ids/178501-800-auto?v=636383365370530000&width=800&height=auto&aspect=true', 'SKU: 11121601001', 500)

const product6 = new Product('Traviata', 'Galletitas Traviata X506g', 471, 'https://jumboargentina.vtexassets.com/arquivos/ids/766464-800-auto?v=638104413698500000&width=800&height=auto&aspect=true', 'SKU: 11110102024', 430)

const product7 = new Product('Donuts', 'Galletitas Donuts Leche X52g', 204, 'https://jumboargentina.vtexassets.com/arquivos/ids/705787-800-auto?v=637908178674370000&width=800&height=auto&aspect=true', 'SKU: 11120995011', 630)

const product8 = new Product('Nesquik', 'Cacao Nesquik Polvo 360g', 615, 'https://jumboargentina.vtexassets.com/arquivos/ids/767885-800-auto?v=638114025804830000&width=800&height=auto&aspect=true', 'SKU: 11250101058', 260)

const product9 = new Product('Aguila', 'Tableta Chocolate Aguila 70% Cacao X150gr', 760, 'https://jumboargentina.vtexassets.com/arquivos/ids/583235-800-auto?v=637234677122300000&width=800&height=auto&aspect=true', 'SKU: 11250301013', 430)

const product10 = new Product('La Merced','Yerba Mate La Merced Barcbacua O.c 500g', 500, 'https://jumboargentina.vtexassets.com/arquivos/ids/621310-800-auto?v=637473138291000000&width=800&height=auto&aspect=true', 'SKU: 11230306016', 800)

const productManager = new ProductManager('./products.txt') 

// utilizando la constante productManager llamamos al método para agregar los productos
await productManager.addProduct(product1)
await productManager.addProduct(product2)
await productManager.addProduct(product3)
await productManager.addProduct(product4)
await productManager.addProduct(product5)
await productManager.addProduct(product6)
await productManager.addProduct(product7)
await productManager.addProduct(product8)
await productManager.addProduct(product9)
await productManager.addProduct(product10)

// prueba code repetido 
const product11 = new Product('Playadito Suave', 'Yerba Mate X1kg', 679, 'https://jumboargentina.vtexassets.com/arquivos/ids/711224-800-auto?v=637938633804770000&width=800&height=auto&aspect=true', 'SKU: 11230376006', 236)
await productManager.addProduct(product11) // producto con code repetido



//productManager.getProductById(4) // buscador de productos por id
//productManager.updateProduct(product2.id, { price: 690, description: "Galletitas Oreo Bañadas Chocolate Leche Milka 119g Capsuland" }) //actualiza campos del producto
//productManager.deleteProduct(3)
//productManager.getProduct().then(prod => console.log(prod))
//await productManager.getProduct()
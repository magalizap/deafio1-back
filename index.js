// PRIMER DESAFÍO: 

class ProductManager {
    constructor(){
        this.products = [], // estado inicial del carrito
        this.id = 1
    }
    addProduct(product){
        for (let i = 0; i < this.products.length; i++) { // Validación campo code
            if(this.products[i].code === product.code){
                console.log(`El código ${product.code} hace referencia a un producto existente`);
                break;
            }
        }

        if(!Object.values(product).includes(undefined)){ // corroboramos que no haya campos vacíos
            product.id = this.id ++
            this.products.push(product) //agregamos los productos al arreglo
        }else{
            console.log('Debes llenar todos los campos')
        }


    }

    getProduct(){
        return this.products // nos devuelve el arreglo con los productos creados
    }

    getProductById(id){
        if(!this.products.find((product) => product.id === id)){ // buscamos un producto por su id 
            console.log('Not found')
        }else{
            console.log(this.products.find((product) => product.id === id))
        }
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

const productManager = new ProductManager() 
// utilizando la constante productManager llamamos al método para agregar los productos
productManager.addProduct(product1)
productManager.addProduct(product2)
productManager.addProduct(product3)

console.log(productManager.getProduct())

// prueba code repetido 
const product4 = new Product('Playadito Suave', 'Yerba Mate X1kg', 679, 'https://jumboargentina.vtexassets.com/arquivos/ids/711224-800-auto?v=637938633804770000&width=800&height=auto&aspect=true', 'SKU: 11230376006', 236)

productManager.getProductById(2) // buscador de productos por id
productManager.addProduct(product4) 
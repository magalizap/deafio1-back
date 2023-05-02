const socket = io()
const products = document.getElementById('products')


socket.on('get', arrayProducs => {
    console.log(arrayProducs)
})

socket.on('post', product => {
    console.log(product)
    
})


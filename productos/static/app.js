// Endpoints de su API
const productoAleatorioURL = "http://localhost:8000/api/producto/" // Aqui debe traer solo una persona (ojala de manera aleatoria)



// ---------- Constantes ----------
const tituloProducto = document.querySelector("#tituloProducto")
const imagenProducto = document.querySelector("#imgProducto")
const descripcionProducto = document.querySelector("#descripcionProducto")
const precioProducto = document.querySelector("#precioProducto")


function cambiarProducto(producto){
    tituloProducto.textContent = producto.titulo
    imagenProducto.src = producto.imagen
    descripcionProducto.textContent = producto.descripcion
    precioProducto.textContent = "$"+producto.precio.toLocaleString('es-CL')
}


async function getProductoAleatorio(){
    try{
        const response = await fetch(productoAleatorioURL)
        const data = await response.json()
        cambiarProducto(data)
    }catch(error){
        console.log(error)
    }
}
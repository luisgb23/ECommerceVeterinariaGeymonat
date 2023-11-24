const carrito =  JSON.parse(localStorage.getItem("miCarrito"))|| [] 
const contenedor = document.querySelector("div.contenedor#divcontenedor") 
const iconCarrito = document.querySelector("img.icono")
const buscar = document.querySelector("input#buscarProducto")
const tablaCarrito = document.querySelector("table tbody#tablaCarrito")
const btnComprar = document.querySelector("button#comprar")

function cardProducto(producto) {
    return `<div class="card card-producto text-center">
                <img src="${producto.imagen}" class="card-img-top img-producto">
                <div class="img-producto"></div>
                <div class="card-body">
                    <div class="card-title">${producto.nombre}</div>
                    <div class="precio">$ ${producto.precio}</div>
                    <button id="${producto.id}" class="btn btn-success">Agregar</button>
                </div>
            </div>`
}


function cargarProductos(prod) {
    contenedor.innerHTML = ""
    if (prod.length > 0) { 
        prod.forEach((producto)=> contenedor.innerHTML += cardProducto(producto))
        handlerBotonAgregar()
    } else {
        contenedor.innerHTML = cardError()
    }
}
function handlerBotonAgregar() {
    const Agregar = document.querySelectorAll("button.btn")
    Agregar.forEach((boton)=> {
        boton.addEventListener("click", (e)=> {
            const id = parseInt(e.target.id)
            const productoSeleccionado = productos.find((producto)=> producto.id === id)
            carrito.push(productoSeleccionado)
            localStorage.setItem("miCarrito", JSON.stringify(carrito))
        })
    })
} 

function cardError() {
    return `<div class="card text-bg-danger mb-3">
                <div class="card-header">🤦🏻‍♂️</div>
                    <div class="card-body">
                    <h5 class="card-title">No pudimos cargar los productos</h5>
                    <p class="card-text">Intenta nuevamente en unos segundos.</p>
                </div>
            </div>`
        }


cargarProductos(productos)

function armarTablaCarrito() {
    tablaCarrito.innerHTML = ""

    for (let i = 1; i <= localStorage.length; i++) {
        tablaCarrito.innerHTML += `<tr>
                                        <td>${localStorage.getItem("id")}</td>
                                        <td>${localStorage.getItem("nombre")}</td>
                                        <td>$ ${localStorage.getItem("precio")}</td>
                                    </tr>`
    }
}

iconCarrito.addEventListener("mousemove", ()=> {
    iconCarrito.title = carrito.length > 0 ? `${carrito.length} productos en carrito` 
                                          : "Carrito sin productos"
})

buscar.addEventListener("search", ()=> {
    let busqueda = buscar.value.trim().toLowerCase()
    console.log(busqueda)
    let resultado = productos.filter((producto)=> producto.nombre.toLowerCase().includes(busqueda))
    cargarProductos(resultado)
}) 

btnComprar.addEventListener("click", ()=>{
    alert("La compra se realizó correctamente")
    localStorage.clear()
    location.reload()
})


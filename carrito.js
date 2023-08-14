//JSON fetch:
let productosEnCarrito = localStorage.getItem("productos-en-carrito");    //nombre del array en json (cambiar despues)
productosEnCarrito = JSON.parse(productosEnCarrito);

//DOM fetch:
let carritoSinNada = document.querySelector("#carritosin-nada");
let carritoProductos = document.querySelector("#carrito-productos");
let carritoAcciones = document.querySelector("#carrito-acciones");
let carritoCompletado = document.querySelector("#carrito-completado");
let carritoEliminarProducto = document.querySelectorAll(".carrito-eliminar-producto");
let btnVaciarCarrito = document.querySelector("#carrito-acciones-vaciar");
let btnTotal = document.querySelector("#carrito-acciones-total");
let btnComprar = document.querySelector("#carrito-acciones-comprar");
function agregarProducto() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        carritoSinNada.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoCompletado.classList.add("disabled");

        carritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-nombre-producto">
                    <small>Nombre:</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-cantidad-producto">
                    <small>cantidad:</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>precio:</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-subtotal-producto">
                    <small>subtotal:</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-eliminar-producto" id="${producto.id}"><i class="bi bi-trash3"></i></button> 
            `;
            carritoProductos.append(div);
        });
    } else {
        carritoSinNada.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoCompletado.classList.add("disabled");
    }
    botonesDeEliminar();
    total();
}
agregarProducto();

function botonesDeEliminar() {
    carritoEliminarProducto = document.querySelectorAll(".carrito-eliminar-producto");
    carritoEliminarProducto.forEach(boton => {
        boton.addEventListener("click", eliminarProducto);
    });
}

function eliminarProducto(e) {
    let idBoton = e.currentTarget.id;
    const productoEliminado = productosEnCarrito.find(producto => producto.id === idBoton);
    const INDEX = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(INDEX,1);
    agregarProducto();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

btnVaciarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    agregarProducto();
}

function total() {
    const calcularTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0);
    btnTotal.innerText = `$${calcularTotal}`;
}

btnComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    carritoSinNada.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoCompletado.classList.remove("disabled");
}

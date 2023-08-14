//Array de objetos (productos):
const listaDeProductos = [
    {
        id: "producto|a-1",
        titulo: "producto|a-1",
        imagen: "./assets/abrigo01.jpg",
        categoria: {
            nombre: "Productos|a",
            id: "producto|a"
        },
        precio: 1200
    },
    {
        id: "producto|a-2",
        titulo: "producto|a-2",
        imagen: "./assets/abrigo02.jpg",
        categoria: {
            nombre: "Productos|a",
            id: "producto|a"
        },
        precio: 1500
    },
    {
        id: "producto|b-1",
        titulo: "producto|b-1",
        imagen: "./assets/pantalon01.png",
        categoria: {
            nombre: "Productos|b",
            id: "producto|b"
        },
        precio: 2000
    },
    {
        id: "producto|b-2",
        titulo: "producto|b-2",
        imagen: "./assets/pantalon02.png",
        categoria: {
            nombre: "Productos|b",
            id: "producto|b"
        },
        precio: 2500
    },
    {
        id: "producto|c-1",
        titulo: "producto|c-1",
        imagen: "./assets/remera01.jpg",
        categoria: {
            nombre: "Productos|c",
            id: "producto|c"
        },
        precio: 3000
    },
    {
        id: "producto|c-2",
        titulo: "producto|c-2",
        imagen: "./assets/remera02.jpg",
        categoria: {
            nombre: "Productos|c",
            id: "producto|c"
        },
        precio: 3500
    }
];

// DOM fetch:
const mainContent = document.querySelector("#main-content");
let botonesAgregar = document.querySelectorAll(".agregar");
const CONTADOR = document.querySelector("#contador");

//Functions:
function agregarProducto() {
    listaDeProductos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
        <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="nombre">${producto.titulo}</h3>
            <p class="precio">$${producto.precio}</p>
            <button class="agregar" id= "${producto.id}">Agregar</button>
        </div>
            `
        mainContent.append(div);
    });
    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}
agregarProducto();

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContador();
} else {
    productosEnCarrito = [];
}
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productosAgregados = listaDeProductos.find(producto => producto.id === idBoton);  //listaDeProductos == productos (version de carpi)

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productosAgregados.cantidad = 1;
        productosEnCarrito.push(productosAgregados);
    }
    actualizarContador();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));   //cambiar nombre de array en JSON
};

function actualizarContador() {
    let contador = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    CONTADOR.innerHTML = contador;
}
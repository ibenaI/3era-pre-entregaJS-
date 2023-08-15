//Array de objetos (productos):
const listaDeProductos = [
    {
        id: "producto|a-1",
        titulo: "producto|a-1",
        imagen: "./assets/content.jpg",
        categoria: {
            nombre: "Productos|a",
            id: "producto|a"
        },
        precio: 1200
    },
    {
        id: "producto|a-2",
        titulo: "producto|a-2",
        imagen: "./assets/content.jpg",
        categoria: {
            nombre: "Productos|a",
            id: "producto|a"
        },
        precio: 1500
    },
    {
        id: "producto|b-1",
        titulo: "producto|b-1",
        imagen: "./assets/content.jpg",
        categoria: {
            nombre: "Productos|b",
            id: "producto|b"
        },
        precio: 2000
    },
    {
        id: "producto|b-2",
        titulo: "producto|b-2",
        imagen: "./assets/content.jpg",
        categoria: {
            nombre: "Productos|b",
            id: "producto|b"
        },
        precio: 2500
    },
    {
        id: "producto|c-1",
        titulo: "producto|c-1",
        imagen: "./assets/content.jpg",
        categoria: {
            nombre: "Productos|c",
            id: "producto|c"
        },
        precio: 3000
    },
    {
        id: "producto|c-2",
        titulo: "producto|c-2",
        imagen: "./assets/content.jpg",
        categoria: {
            nombre: "Productos|c",
            id: "producto|c"
        },
        precio: 3500
    }
];

// DOM fetch:
const mainContent = document.querySelector("#main-content");
let btnAgregar = document.querySelectorAll(".agregar");
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
    botonesAgregar();
    console.log(btnAgregar);
}
agregarProducto();

function botonesAgregar() {
    btnAgregar = document.querySelectorAll(".agregar");
    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    contador();
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
    contador();

    localStorage.setItem("productos-agregados", JSON.stringify(productosEnCarrito));
};

function contador() {
    let contador = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    CONTADOR.innerHTML = contador;
}
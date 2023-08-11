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

const mainContent = document.querySelector("#main-content");
function agregarProducto() {
    listaDeProductos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
        <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="nombre">${producto.titulo}</h3>
            <p class="precio">$${producto.precio}</p>
            <button class="agregar">Agregar</button>
        </div>
        `;
        mainContent.append(div);
    });
}
agregarProducto();
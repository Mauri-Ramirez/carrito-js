//CLASE CONSTRUCTORA
class Product{
    constructor(nombre, precio, id, img, stock, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.img = img;
    this.stock = stock;
    this.cantidad = cantidad || 0;
    this.subtotal = 0;
    this.aumentarCantidad = () => this.cantidad++;
    this.restarCantidad = () => this.cantidad--;
    }
}

const carrito = []; 
const productos = [];
const caja = document.querySelector("#caja");

//FUNCION PARA TREAER LAS COSAS DEL JSON
async function traerJson(){
    const res = await fetch("../data/data.json")
    const data = await res.json()
    data.forEach(e => productos.push(new Product(e.nombre, e.precio, e.id, e.img, e.stock, e.cantidad)));
    crearCards();
} 

//FUNCION PARA CREAR LAS CARDS
function crearCards(){
    for(const element of productos){
        const contenedor = document.createElement("div");
        contenedor.className = "cardProductos";
        contenedor.innerHTML += `
            <div> 
                <img src="${element.img}" class="card-cart-img" alt="${element.nombre}">
                <h5>${element.nombre}</h5>
                <button id=${element.id} class="btn btn-outline-dark comprar">Comprar</button>
            </div>`
        caja.appendChild(contenedor);
        document.getElementById(`${element.id}`).addEventListener("click", () => comprarProductos(element));
    }
}

// ENVIO LOS PRODUCTOS AL CARRITO
function comprarProductos(producto){
    let compra = carrito.find(element=> element.nombre === producto.nombre)
    if(compra){
        if(compra.cantidad < producto.stock){
            compra.aumentarCantidad();
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Oops... No Hay Mas Stock'
            })
        }
    }else{
        carrito.push(producto);
        producto.aumentarCantidad();
    }
    totalProductos()
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function totalProductos() {
    let total = 0;
    const tabla = document.getElementById("tablaDeProductos"); 
    tabla.innerHTML = "";
    for(let i=0; i < carrito.length;i++){
        total += carrito[i].cantidad;
        // PINTO EL CARRITO
        const tablita = document.createElement("tr");
        tablita.innerHTML += `
        <td>
        <img src=${carrito[i].img}?${carrito[i].id}?200x200 width=100 alt="${carrito[i].nombre}">
        </td>
        <td>${carrito[i].nombre}</td>
        <td>$${carrito[i].precio}</td>
        <td>
        <button class="borrar-producto btn-sm" id="borrar${carrito[i].id}">-</button>
        </td>
        <td>${carrito[i].cantidad}</td>
        <td>
        <button class="sumar-producto btn-sm" id="sumar${carrito[i].id}">+</button>
        </td>
        `
        tabla.appendChild(tablita);
        // BOTON BORRAR
        document.getElementById(`borrar${carrito[i].id}`).addEventListener('click', () => eliminarProducto(carrito[i].id))
        // BOTON SUMAR
        document.getElementById(`sumar${carrito[i].id}`).addEventListener('click', () => sumarProducto(carrito[i].id))  
    }
    const contador = document.getElementById("contador");
    contador.innerHTML = total;
}

// BORRAR PRODUCTO
function eliminarProducto(id) {

    let encontradoRes = carrito.find(element => element.id === id )
    if(encontradoRes.cantidad <= 1){
        carrito.splice(carrito.indexOf(encontradoRes),1)
        }else{
        encontradoRes.restarCantidad()
}
    
totalProductos()
localStorage.setItem("carrito", JSON.stringify(carrito))
}

// SUMAR PRODUCTO
function sumarProducto(id) {

    let encontrado = carrito.find(element => element.id === id )
    if(encontrado){
        encontrado.aumentarCantidad()      
    }
    totalProductos()
    localStorage.setItem("carrito", JSON.stringify(carrito))
} 

// LOCAL STORE
function cargarLocalStorage(){
    let carro = JSON.parse(localStorage.getItem("carrito"))
    if(carro){
        for(let i = 0; i < carro.length; i++){
        carrito.push(new Product(carro[i].nombre, carro[i].precio,  carro[i].id, carro[i].img, carro[i].stock, carro[i].cantidad))     
        }
        totalProductos()
    }
}

cargarLocalStorage();
traerJson();
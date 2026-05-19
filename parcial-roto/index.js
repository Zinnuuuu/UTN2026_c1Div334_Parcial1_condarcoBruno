//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    let carritoStr = localStorage.getItem("carrito")
    const carrito = (carritoStr) ? JSON.parse(carritoStr) : [];
    return carrito
}


//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) { 
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let card = elementoClickeado.closest("li")

    let nombre = card.querySelector(".nombre-producto").textContent
    let precioStr = card.querySelector(".precio-producto").textContent
    let precio = parseInt(precioStr.replace("$", ""));

    let carrito = obtenerCarrito();

    let productoExiste = carrito.find((p) => p.nombre === nombre);

    if (productoExiste){
        productoExiste.cantidad++;
    }else{
        carrito.push({nombre: nombre, precio:precio , cantidad: 1})
    }

    console.log(carrito);
    guardarCarrito(carrito);
    alert("Un/Una: "+ nombre + " fue agregado/a al carrito")
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let card = elementoClickeado.closest("li")

    let nombre = card.querySelector(".nombre-producto").textContent
    let carrito = obtenerCarrito();
    if (carrito.length === 0){
        alert("No hay ningun producto guardado en el carrito")
        return
    }

    let productoExiste = carrito.find((p) => p.nombre === nombre)

    if(!productoExiste){
        alert("No hay mas " + nombre + " en el carrito")
        return
    }

    productoExiste.cantidad--;

    if (productoExiste.cantidad === 0){
        carrito = carrito.filter((p) => p.nombre !== nombre)
    }
    console.log(carrito)

    guardarCarrito(carrito)

    alert("Un/Una: " + nombre + "fue eliminado del carrito")
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});


function obtenerCarrito() {
    let carritoStr = localStorage.getItem("carrito")
    const carrito = (carritoStr) ? JSON.parse(carritoStr) : []    
    return carrito;
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito()
    let total= 0;

    carrito.forEach(producto => {  /* recorre productos y agrega a las filas su nombre,cant y precio*/
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
        `;
        tabla.appendChild(fila);

        total += (producto.precio * producto.cantidad)
    });

    document.getElementById("valor-final").textContent = "El valor total del carrito es $ "+ total
}

function limpiarCarrito() 
{
    localStorage.clear() 
    alert("Carrito limpiado correctamente")
    location.reload() /* RECARGA PAGINA  para que se borre el total y las filas*/
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});
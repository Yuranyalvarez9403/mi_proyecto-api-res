document.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos() {
    try {
        const res = await fetch('http://localhost:3000/productos');
        const productos = await res.json();
        const tbody = document.querySelector("#productosTabla tbody");
        tbody.innerHTML = "";

        productos.forEach(prod => {
            const fila = `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nombre}</td>
                    <td>$${parseFloat(prod.precio).toFixed(2)}</td>
                    <td>${prod.descripcion}</td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });
    } catch (error) {
        alert("Error al cargar productos: " + error.message);
    }
}
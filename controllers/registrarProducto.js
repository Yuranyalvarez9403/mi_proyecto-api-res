const API_PRODUCTOS = "http://localhost:3000/productos"; // corregido

async function registrarProducto() { // corregido nombre
    const form = document.getElementById("productoForm"); // corregido id
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch(API_PRODUCTOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Producto registrado con ID: ${result.id}`);
            form.reset();
        } else {
            const error = await response.text();
            alert('Error: ' + error);
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
}
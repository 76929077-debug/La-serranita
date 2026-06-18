// 1. ARRAY DE PRODUCTOS (¡Aquí agregas todos los que quieras!)
const listaProductos = [
    { id: "1", nombre: "Queso Fresco", precio: 15, imagen: "https://www.laserranita.pe/nieve/wp-content/uploads/Productos-7-25-300x300.png" },
    { id: "2", nombre: "Queso Fermentado", precio: 8, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGmOB-2aCRmDbb2jZLusHJl44qI6mOpgGsQ&s" },
    { id: "3", nombre: "Queso Prensado  ", precio: 12, imagen: "https://es.edairynews.com/wp-content/uploads/2025/01/Camembert-el-queso-que-podria-mejorar-la-memoria-segun-la-ciencia.png" },
    { id: "4", nombre: "Yogurt Natural Vainilla", precio: 14, imagen: "https://recetinas.com/wp-content/uploads/2018/07/yogur-natura.jpg" },
    { id: "5", nombre: "Yogurt Natural Fresa", precio: 14, imagen: "https://vimafoods.com/wp-content/uploads/2024/09/Yogurt_de_Fresa_1.webp" },
    { id: "6", nombre: "Yogurt Natural Lucuma", precio: 15, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMgP_kpKU060okOCowFB4LKvG38My5VsBqtg&s" },
    { id: "7", nombre: "Manjar Blanco", precio: 20, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TJz26S6CmwtWNo-cRZ8eHQlDgrLUPz9Qqw&s" },
    { id: "8", nombre: "Helado de leche", precio: 5, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65oUuRZLT0Mgpn5rUUg-okkelr4nYI_gQAA&s" },
    { id: "9", nombre: "Helado de chocolate", precio: 7, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65oUuRZLT0Mgpn5rUUg-okkelr4nYI_gQAA&s" },
];

// 2. CARGAR CARRITO DESDE LOCALSTORAGE
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// 3. FUNCIÓN PARA DIBUJAR LAS TARJETAS EN EL INDEX2.HTML
function renderizarProductos() {
    const contenedor = document.getElementById('productos');
    if (!contenedor) return; // Por si acaso no estamos en el index

    contenedor.innerHTML = ""; // Limpiamos contenedor

    listaProductos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
                <div class="card shadow-sm" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 180px; object-fit: contain; padding: 10px;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title fw-bold">${producto.nombre}</h5>
                            <p class="text-danger fw-bold fs-5">S/ ${producto.precio}</p>
                        </div>
                        <div>
                            <input type="number" id="cant-${producto.id}" class="form-control mb-2 text-center" value="1" min="1">
                            <button class="btn btn-danger w-100" onclick="agregarAlCarrito('${producto.id}')">Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// 4. FUNCIÓN PARA ACTUALIZAR EL CONTADOR AMARILLO
function actualizarContador() {
    const contador = document.getElementById('contador');
    if (contador) {
        // Suma las cantidades de todos los productos en el carrito
        contador.textContent = carrito.reduce((total, prod) => total + prod.cantidad, 0);
    }
}

// 5. FUNCIÓN DINÁMICA PARA AGREGAR AL CARRITO
// Se activa directamente al presionar el botón de la tarjeta
window.agregarAlCarrito = function(id) {
    // Buscar el producto en nuestra lista de productos por su ID
    const productoBase = listaProductos.find(p => p.id === id);
    
    // Capturar la cantidad que el usuario puso en el input de esa tarjeta
    const inputCantidad = document.getElementById(`cant-${id}`);
    const cantidadAñadir = inputCantidad ? parseInt(inputCantidad.value) : 1;

    if (cantidadAñadir < 1 || isNaN(cantidadAñadir)) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    // Verificar si ya está en el carrito
    const existeEnCarrito = carrito.find(prod => prod.id === id);

    if (existeEnCarrito) {
        // Si ya existe, le sumamos la cantidad seleccionada
        existeEnCarrito.cantidad += cantidadAñadir;
    } else {
        // Si es nuevo, lo agregamos con los datos del producto base
        carrito.push({
            id: productoBase.id,
            nombre: productoBase.nombre,
            precio: productoBase.precio,
            cantidad: cantidadAñadir
        });
    }

    // Guardar en LocalStorage y refrescar el contador de la web
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();

    // Feedback visual rápido
    alert(`¡Se añadieron ${cantidadAñadir} unidad(es) de "${productoBase.nombre}" al carrito!`);
    
    // Reiniciar el input de cantidad a 1
    if (inputCantidad) inputCantidad.value = 1;
};

// 6. INICIALIZAR LA PÁGINA
renderizarProductos();
actualizarContador();
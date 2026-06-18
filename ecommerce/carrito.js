let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const lista = document.getElementById('lista-carrito');

        function renderizarCarrito() {
            lista.innerHTML = '';
            if (carrito.length === 0) {
                lista.innerHTML = '<tr><td colspan="5" class="text-center py-4">Tu carrito está vacío.</td></tr>';
                document.getElementById('subtotal').textContent = 'S/. 0.00';
                document.getElementById('total-compra').textContent = 'S/. 0.00';
                return;
            }

            let total = 0;
            carrito.forEach((prod, index) => {
                const subtotalProducto = prod.precio * prod.cantidad;
                total += subtotalProducto;

                lista.innerHTML += `
                    <tr>
                        <td><span class="fw-bold">${prod.nombre}</span></td>
                        <td>S/. ${prod.precio.toFixed(2)}</td>
                        <td>${prod.cantidad}</td>
                        <td class="fw-bold">S/. ${subtotalProducto.toFixed(2)}</td>
                        <td><button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})"><i class="bi bi-trash"></i></button></td>
                    </tr>
                `;
            });

            document.getElementById('subtotal').textContent = `S/. ${total.toFixed(2)}`;
            document.getElementById('total-compra').textContent = `S/. ${total.toFixed(2)}`;
        }

        function eliminarProducto(index) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        }

        function vaciarCarrito() {
            carrito = [];
            localStorage.removeItem('carrito');
            renderizarCarrito();
        }

        renderizarCarrito();
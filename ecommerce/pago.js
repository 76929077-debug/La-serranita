const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
        document.getElementById('monto-pagar').textContent = `S/. ${total.toFixed(2)}`;

        // Simular evento de procesamiento
        document.getElementById('form-pago').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('btn-pagar');
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';

            setTimeout(() => {
                // Ocultar formulario, borrar carrito y mostrar éxito
                document.getElementById('form-pago').classList.add('d-none');
                document.getElementById('alerta-exito').classList.remove('d-none');
                localStorage.removeItem('carrito'); // Limpia el carrito tras la compra
            }, 2500); // 2.5 segundos de simulación de espera bancaria
        });
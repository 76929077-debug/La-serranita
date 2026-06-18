// ============================================================
//  script.js — Lácteos La Serranita
//  1. Menú hamburger
//  2. Validación del formulario de contacto
// ============================================================

// ── 1. MENÚ HAMBURGER ──
const botonMenu = document.getElementById("boton-menu");
const nav = document.querySelector("header nav");

botonMenu.addEventListener("click", function () {
  nav.classList.toggle("abierto");
});

// ── 2. VALIDACIÓN DEL FORMULARIO ──
const formulario = document.querySelector("form");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre   = document.getElementById("nombre")?.value.trim();
    const correo   = document.getElementById("correo")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const mensaje  = document.getElementById("mensaje")?.value.trim();

    limpiarErrores();

    let formularioValido = true;

    if (!nombre) {
      mostrarError("nombre", "El nombre es obligatorio.");
      formularioValido = false;
    }

    if (!correo) {
      mostrarError("correo", "El correo es obligatorio.");
      formularioValido = false;
    } else if (!correo.includes("@")) { // Validación súper básica que cualquiera puede explicar
      mostrarError("correo", "El correo debe contener un @.");
      formularioValido = false;
    }

    if (!mensaje) {
      mostrarError("mensaje", "El mensaje no puede estar vacío.");
      formularioValido = false;
    }

    if (formularioValido) {
      mostrarConfirmacion();
      formulario.reset();
    }
  });
}

function mostrarError(idCampo, mensajeError) {
  const campo = document.getElementById(idCampo);
  if (!campo) return;
  const error = document.createElement("p");
  error.classList.add("error-campo");
  error.textContent = mensajeError;
  campo.insertAdjacentElement("afterend", error);
  campo.classList.add("campo-invalido");
}

function limpiarErrores() {
  document.querySelectorAll(".error-campo").forEach(e => e.remove());
  document.querySelectorAll(".campo-invalido").forEach(c => c.classList.remove("campo-invalido"));
}


function mostrarConfirmacion() {
  const existente = document.getElementById("mensaje-confirmacion");
  if (existente) existente.remove();

  const confirmacion = document.createElement("p");
  confirmacion.id = "mensaje-confirmacion";
  confirmacion.textContent = "✔ Tu mensaje fue enviado correctamente. Te responderemos pronto.";
  formulario.insertAdjacentElement("afterend", confirmacion);

  setTimeout(() => confirmacion.remove(), 5000);
}

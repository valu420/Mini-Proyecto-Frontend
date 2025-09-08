// Espera a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnAccion");

  btn.addEventListener("click", () => {
    alert("¡Hola! Has hecho clic en el botón 🚀");
  });
});
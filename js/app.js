// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita que se recargue la página

      const email = form.querySelector("input[type='email']").value;
      const password = form.querySelector("input[type='password']").value;

      if (!email || !password) {
        alert("Por favor completa todos los campos.");
        return;
      }

      // Simulación de login
      if (email === "admin@taskly.com" && password === "1234") {
        alert("¡Bienvenido a Taskly!");
        // Redirigir a otra página después del login
        window.location.href = "dashboard.html";
      } else {
        alert("Credenciales incorrectas, intenta de nuevo.");
      }
    });
  }
});
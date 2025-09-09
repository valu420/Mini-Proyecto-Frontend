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

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

function confirmarLogout() {
  return confirm("¿Estás seguro de que deseas cerrar sesión?");
}

// Guardar tarea desde el formulario
const taskForm = document.getElementById('taskForm');
if (taskForm) {
  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaCierre = document.getElementById('fechaCierre').value;
    const prioridad = document.getElementById('prioridad').value;

    const nuevaTarea = {
      titulo,
      descripcion,
      fechaInicio,
      fechaCierre,
      prioridad,
      estado: 'todo' // por defecto, se guarda en "Por hacer"
    };

    // Guardar en localStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));

    alert('✅ Tarea creada con éxito');
    taskForm.reset();

    // Redirigir al kanban
    window.location.href = "kanban.html";
  });
}

// Mostrar tareas en el Kanban
function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  tareas.forEach(t => {
    const item = document.createElement('div');
    item.classList.add('kanban-item');
    item.setAttribute('draggable', 'true');
    item.innerText = `${t.titulo} (${t.prioridad})`;

    const columna = document.getElementById(t.estado);
    columna.appendChild(item);

    // habilitar drag para los nuevos
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      // actualizar estado
      const nuevaColumna = item.parentElement.id;
      t.estado = nuevaColumna;
      localStorage.setItem('tareas', JSON.stringify(tareas));
    });
  });
}

if (document.querySelector('.kanban')) {
  cargarTareas();
}

// Funcionalidad drag & drop para Kanban
const items = document.querySelectorAll('.kanban-item');
const columns = document.querySelectorAll('.kanban-items');

items.forEach(item => {
  item.addEventListener('dragstart', () => {
    item.classList.add('dragging');
  });
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
  });
});

columns.forEach(col => {
  col.addEventListener('dragover', e => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    col.appendChild(dragging);
  });
});
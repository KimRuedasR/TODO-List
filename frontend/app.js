document.addEventListener("DOMContentLoaded", () => {
  const taskTitleInput = document.getElementById("task-title");
  const taskDescInput = document.getElementById("task-desc");
  const addTaskBtn = document.getElementById("add-task-btn");
  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  const taskList = document.getElementById("task-list");
  let editMode = false;
  let editTaskId = null;

  // Obtener todas las tareas del backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const tasks = await response.json();
      tasks.sort((a, b) => (a.status === "completed" ? 1 : -1)); // Mover tareas completadas al final
      displayTasks(tasks);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  // Mostrar las tareas en la tabla
  const displayTasks = (tasks) => {
    taskList.innerHTML = ""; // Limpiar la lista de tareas existente
    tasks.forEach((task) => {
      const taskRow = document.createElement("tr"); // Crear una fila para cada tarea
      taskRow.className = task.status === "completed" ? "completed" : ""; // Añadir clase si la tarea está completada
      taskRow.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td><input type="checkbox" class="status-checkbox" ${
          task.status === "completed" ? "checked" : ""
        } onclick="toggleTask(${task.id})"></td>
        <td class="action-buttons">
          <button class="action-btn edit-btn" onclick="editTask(${task.id}, '${
        task.title
      }', '${task.description}')">Editar ✏️</button>
          <button class="action-btn delete-btn" onclick="deleteTask(${
            task.id
          })">Eliminar 🗑️</button>
        </td>
      `;
      taskList.appendChild(taskRow); // Añadir la fila a la tabla
    });
  };

  // Marcar una tarea como completada o incompleta
  window.toggleTask = async (id) => {
    try {
      const taskElement = taskList.querySelector(
        `input[onclick="toggleTask(${id})"]`
      );
      const isCompleted = taskElement.checked;
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: isCompleted ? "completed" : "pending" }), // Cambiar el estado de completada
      });
      fetchTasks();
    } catch (error) {
      console.error("Error al completar la tarea:", error);
    }
  };

  // Agregar o editar una tarea
  const addOrEditTask = async () => {
    const title = taskTitleInput.value;
    const description = taskDescInput.value;

    // Verificar que ambos campos estén llenos
    if (!title || !description) {
      alert("Por favor, complete ambos campos.");
      return;
    }

    try {
      if (editMode) {
        await fetch(`/api/tasks/${editTaskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });
        editMode = false;
        editTaskId = null;
        addTaskBtn.innerText = "Agregar Tarea";
        addTaskBtn.classList.remove("edit-mode");
        cancelEditBtn.style.display = "none";
      } else {
        await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });
      }
      taskTitleInput.value = "";
      taskDescInput.value = "";
      fetchTasks();
    } catch (error) {
      console.error(
        `Error al ${editMode ? "editar" : "agregar"} la tarea:`,
        error
      );
    }
  };

  addTaskBtn.addEventListener("click", addOrEditTask);

  // Detectar Enter y Shift + Enter en los campos de entrada
  [taskTitleInput, taskDescInput].forEach((input) => {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        addOrEditTask();
      }
    });
  });

  // Editar una tarea
  window.editTask = (id, title, description) => {
    taskTitleInput.value = title;
    taskDescInput.value = description;
    addTaskBtn.innerText = "Editar Tarea";
    addTaskBtn.classList.add("edit-mode");
    cancelEditBtn.style.display = "block";
    editMode = true;
    editTaskId = id;
  };

  // Cancelar edición
  cancelEditBtn.addEventListener("click", () => {
    taskTitleInput.value = "";
    taskDescInput.value = "";
    addTaskBtn.innerText = "Agregar Tarea";
    addTaskBtn.classList.remove("edit-mode");
    cancelEditBtn.style.display = "none";
    editMode = false;
    editTaskId = null;
  });

  // Eliminar una tarea
  window.deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
      if (editMode && editTaskId === id) {
        cancelEditBtn.click();
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Actualizar la lista de tareas
  fetchTasks();
});

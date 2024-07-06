const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Almacenamiento en memoria para las tareas
let tasks = [];

// Obtener todas las tareas
router.get("/", (req, res) => {
  console.log("Lista de tareas actualizada");
  res.status(200).json(tasks);
});

// Crear una nueva tarea
router.post("/", (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task(title, description);
  tasks.push(newTask);
  console.log("Nueva tarea creada ID:", newTask.id);
  res.status(201).json(newTask);
});

// Actualizar una tarea
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = tasks.find((task) => task.id == id);

  if (task) {
    task.title = title !== undefined ? title : task.title;
    task.description =
      description !== undefined ? description : task.description;
    task.status = status !== undefined ? status : task.status;
    console.log("Tarea actualizada:", task.id);
    res.status(200).json(task);
  } else {
    console.log("Tarea no encontrada:", id);
    res.status(404).json();
  }
});

// Eliminar una tarea
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id != id);
  console.log("Tarea eliminada:", id);
  res.status(200).json();
});

module.exports = router;

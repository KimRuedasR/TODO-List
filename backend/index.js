const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 8080;
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(cors());

// Sirviendo archivos estáticos
app.use(express.static(path.join(__dirname, "../frontend")));

// Rutas de las tareas
app.use("/api/tasks", taskRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("--------------------------------------------------------------");
  console.log("|                                                            |");
  console.log("|                        TODO List App                       |");
  console.log("|                           v1.1.0                           |");
  console.log("|                                                            |");
  console.log("|                                                            |");
  console.log("|             _______   _______   _______   _______          |");
  console.log("|            |       | |       | |       | |       |         |");
  console.log("|            |   ✓   | |   ✓   | |   ✓   | |   ✓   |         |");
  console.log("|            |_______| |_______| |_______| |_______|         |");
  console.log("|                                                            |");
  console.log("|             ----:: Servidor iniciado ::----                |");
  console.log("|                                                            |");
  console.log("|                                                            |");
  console.log("|  Frontend: http://localhost:8080                           |");
  console.log("|  GitHub: https://github.com/KimRuedasR                     |");
  console.log("|                                                            |");
  console.log("--------------------------------------------------------------");
});

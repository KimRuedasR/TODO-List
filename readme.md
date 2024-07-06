# ✅ Mi Lista de Tareas ✅

## 📝 Descripción

Aplicación sencilla de una lista de tareas "TODO List" utilizando Node.js y Express para el backend, y HTML, CSS y JavaScript para el frontend. Almacena las tareas en un arreglo en memoria.

## 🛠 Requisitos

Node.js

## 🚀 Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/KimRuedasR/TODO-List.git
```

### 2️⃣ Instalar Dependencias

```bash
npm start
```

### 3️⃣ Iniciar el Servidor

- ```bash
npm install
```

### 4️⃣ Probar

Ir a http://localhost:8080 en el navegador para ver la aplicación de lista de tareas.

## 🌐 Interfaz

La aplicación con interfaz se encuentra en la carpeta frontend y se comunica con el backend a través de la API REST.
Funcionalidades

- Ver todas las tareas.
- Añadir una nueva tarea.
- Marcar una tarea como completada.
- Editar una tarea existente.
- Eliminar una tarea.

## 🛣 Endpoints
Rutas de la API

- (GET) /api/tasks: Obtener todas las tareas.
- (POST) /api/tasks: Crear una nueva tarea.
- (PUT) /api/tasks/:id: Actualizar una tarea existente.
- (DELETE) /api/tasks/:id: Eliminar una tarea.
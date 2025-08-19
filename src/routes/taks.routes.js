import { Router } from "express";
const taskRouter = Router();

// Crear una tarea
taskRouter.post("/", /* controlador */);

// Obtener todas las tareas
taskRouter.get("/", /* controlador */);

// Obtener una tarea por id
taskRouter.get("/:id", /* controlador */);

// Actualizar una tarea
taskRouter.put("/:id", /* controlador */);

// Eliminar una tarea
taskRouter.delete("/:id", /* controlador */);

export default taskRouter;
import { Router } from "express";
import {
	createTask,
	getAllTasks,
	getTaskById,
	updateTask,
	deleteTask
} from "../controllers/task.controllers.js";

const taskRouter = Router();

// Crear una tarea
taskRouter.post("/", createTask);

// Obtener todas las tareas
taskRouter.get("/", getAllTasks);

// Obtener una tarea por id
taskRouter.get("/:id", getTaskById);

// Actualizar una tarea
taskRouter.put("/:id", updateTask);

// Eliminar una tarea
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
import { Router } from "express";
import {
	createTask,
	getAllTasks,
	getTaskById,
	updateTask,
	deleteTask
} from "../controllers/task.controllers.js";
import {
	validateCreateTask,
	validateUpdateTask,
	validateTaskId
} from "../middlewares/taskValidations.js";

const taskRouter = Router();

// Crear una tarea
taskRouter.post("/", validateCreateTask, createTask);

// Obtener todas las tareas
taskRouter.get("/", getAllTasks);

// Obtener una tarea por id
taskRouter.get("/:id", validateTaskId, getTaskById);

// Actualizar una tarea
taskRouter.put("/:id", validateUpdateTask, updateTask);

// Eliminar una tarea
taskRouter.delete("/:id", validateTaskId, deleteTask);

export default taskRouter;
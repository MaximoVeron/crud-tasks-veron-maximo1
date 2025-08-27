import { Router } from "express";
import {
  createTaskCategory,
  getAllTaskCategories,
  getTaskCategoryById,
  updateTaskCategory,
  deleteTaskCategory
} from "../controllers/task_category.controllers.js";
import {
  validateCreateTaskCategory,
  validateUpdateTaskCategory,
  validateTaskCategoryId
} from "../middlewares/taskCategoryValidations.js";

const taskCategoryRouter = Router();

// Crear una relación tarea-categoría
taskCategoryRouter.post("/", validateCreateTaskCategory, createTaskCategory);

// Obtener todas las relaciones tarea-categoría
taskCategoryRouter.get("/", getAllTaskCategories);

// Obtener una relación tarea-categoría por ID
taskCategoryRouter.get("/:id", validateTaskCategoryId, getTaskCategoryById);

// Actualizar una relación tarea-categoría
taskCategoryRouter.put("/:id", validateUpdateTaskCategory, updateTaskCategory);

// Eliminar una relación tarea-categoría
taskCategoryRouter.delete("/:id", validateTaskCategoryId, deleteTaskCategory);

export default taskCategoryRouter;

import { Router } from "express";
import {
  createTaskCategory,
  getAllTaskCategories
} from "../controllers/task_category.controllers.js";

const taskCategoryRouter = Router();

// Crear una relación tarea-categoría
taskCategoryRouter.post("/", createTaskCategory);

// Obtener todas las relaciones tarea-categoría
taskCategoryRouter.get("/", getAllTaskCategories);

export default taskCategoryRouter;

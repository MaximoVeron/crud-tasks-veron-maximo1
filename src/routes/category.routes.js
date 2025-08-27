import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/category.controllers.js";

const categoryRouter = Router();

// Crear una categoría
categoryRouter.post("/", createCategory);

// Obtener todas las categorías
categoryRouter.get("/", getAllCategories);

// Obtener una categoría por ID
categoryRouter.get("/:id", getCategoryById);

// Actualizar una categoría
categoryRouter.put("/:id", updateCategory);

// Eliminar lógicamente una categoría
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
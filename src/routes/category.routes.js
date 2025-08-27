import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/category.controllers.js";
import {
  validateCreateCategory,
  validateUpdateCategory,
  validateCategoryId
} from "../middlewares/categoryValidations.js";

const categoryRouter = Router();

// Crear una categoría
categoryRouter.post("/", validateCreateCategory, createCategory);

// Obtener todas las categorías
categoryRouter.get("/", getAllCategories);

// Obtener una categoría por ID
categoryRouter.get("/:id", validateCategoryId, getCategoryById);

// Actualizar una categoría
categoryRouter.put("/:id", validateUpdateCategory, updateCategory);

// Eliminar lógicamente una categoría
categoryRouter.delete('/:id', validateCategoryId, deleteCategory);

export default categoryRouter;
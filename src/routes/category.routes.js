import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory
} from "../controllers/category.controllers.js";
// Eliminar lógicamente una categoría
categoryRouter.delete('/:id', deleteCategory);

const categoryRouter = Router();

// Crear una categoría
categoryRouter.post("/", createCategory);

// Obtener todas las categorías
categoryRouter.get("/", getAllCategories);

export default categoryRouter;

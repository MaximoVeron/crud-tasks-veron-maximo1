import { Router } from "express";
import {
  createCategory,
  getAllCategories
} from "../controllers/category.controllers.js";

const categoryRouter = Router();

// Crear una categoría
categoryRouter.post("/", createCategory);

// Obtener todas las categorías
categoryRouter.get("/", getAllCategories);

export default categoryRouter;

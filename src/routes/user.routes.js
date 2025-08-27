import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controllers.js";

const userRouter = Router();

// Crear un usuario
userRouter.post("/", createUser);

// Obtener todos los usuarios
userRouter.get("/", getAllUsers);

// Obtener un usuario por id
userRouter.get("/:id", getUserById);

// Actualizar un usuario
userRouter.put("/:id", updateUser);

// Eliminar un usuario
userRouter.delete("/:id", deleteUser);

export default userRouter;
import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controllers.js";
import {
  validateCreateUser,
  validateUpdateUser,
  validateUserId
} from "../middlewares/userValidations.js";

const userRouter = Router();

// Crear un usuario
userRouter.post("/", validateCreateUser, createUser);

// Obtener todos los usuarios
userRouter.get("/", getAllUsers);

// Obtener un usuario por id
userRouter.get("/:id", validateUserId, getUserById);

// Actualizar un usuario
userRouter.put("/:id", validateUpdateUser, updateUser);

// Eliminar un usuario
userRouter.delete("/:id", validateUserId, deleteUser);

export default userRouter;
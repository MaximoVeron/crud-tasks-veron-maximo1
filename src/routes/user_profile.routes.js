import { Router } from "express";
import {
  createUserProfile,
  getAllUserProfiles,
  getUserProfileById,
  updateUserProfile,
  deleteUserProfile
} from "../controllers/user_profile.controllers.js";
import {
  validateCreateUserProfile,
  validateUpdateUserProfile,
  validateUserProfileId
} from "../middlewares/userProfileValidations.js";

const userProfileRouter = Router();

// Crear un perfil de usuario
userProfileRouter.post("/", validateCreateUserProfile, createUserProfile);

// Obtener todos los perfiles de usuario
userProfileRouter.get("/", getAllUserProfiles);

// Obtener un perfil de usuario por ID
userProfileRouter.get("/:id", validateUserProfileId, getUserProfileById);

// Actualizar un perfil de usuario
userProfileRouter.put("/:id", validateUpdateUserProfile, updateUserProfile);

// Eliminar un perfil de usuario
userProfileRouter.delete("/:id", validateUserProfileId, deleteUserProfile);

export default userProfileRouter;

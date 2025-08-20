import { Router } from "express";
import {
  createUserProfile,
  getAllUserProfiles
} from "../controllers/user_profile.controllers.js";

const userProfileRouter = Router();

// Crear un perfil de usuario
userProfileRouter.post("/", createUserProfile);

// Obtener todos los perfiles de usuario
userProfileRouter.get("/", getAllUserProfiles);

export default userProfileRouter;

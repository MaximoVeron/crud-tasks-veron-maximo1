import { Router } from "express";
const userRouter = Router();

// Crear un usuario
userRouter.post("/", /* controlador */);

// Obtener todas las tareas
userRouter.get("/", /* controlador */);

// Obtener una tarea por id
userRouter.get("/:id", /* controlador */);

// Actualizar una tarea
userRouter.put("/:id", /* controlador */);

// Eliminar una tarea
userRouter.delete("/:id", /* controlador */);

export default userRouter;